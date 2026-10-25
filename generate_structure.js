#!/usr/bin/env node

/* eslint-disable */ // ← Prevents ESLint from breaking this file

/**
 * Advanced Project Structure Generator
 * With smart folder & tech-specific emojis
 * Now with Xcode project awareness (.pbxproj, schemes, workspaces, xcuserstate, ...)
 *
 * Usage:
 *   node project_structure.js                      # tree + file contents with per-file line numbers
 *   node project_structure.js --no-content         # tree only
 *   node project_structure.js --no-line-numbers    # file contents without line numbers
 */

const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = "project_structure.md";

const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "out",
  "DerivedData",
  "Pods",
  ".build",
  "vendor",
  "__MACOSX",
  ".vscode",
  ".idea",
]);

// Specific filenames to skip everywhere (tree and contents)
const IGNORED_FILES = new Set([
  "package-lock.json",
  "npm-shrinkwrap.json",
  OUTPUT_FILE,
]);

const ALLOWED_EXT = new Set([
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".json",
  ".ndjson",
  ".html",
  ".css",
  ".scss",
  ".md",
  ".swift",
  ".m",
  ".mm",
  ".h",
  ".c",
  ".cpp",
  ".plist",
  ".xcprivacy",
  ".entitlements",
  ".xcconfig",
  ".xml",
  ".sh",
  ".php",
  ".blade.php",
  ".astro",
  ".vue",
  ".svelte",
  // ---- Xcode additions ----
  ".pbxproj", // project.pbxproj (the heart of an Xcode project)
  ".xcscheme", // build/run/test schemes
  ".xcworkspacedata", // contents.xcworkspacedata
  ".xcuserstate", // UserInterfaceState.xcuserstate (binary, listed but not dumped)
  ".xcsettings", // WorkspaceSettings.xcsettings, IDETemplateMacros etc.
  ".xcbkptlist", // Breakpoints_v2.xcbkptlist
  ".xctestplan", // test plans
  ".storyboard",
  ".xib",
  ".strings",
  ".stringsdict",
  ".xcstrings", // string catalogs
  ".intentdefinition",
  ".metal",
  ".pch",
  ".modulemap",
  ".hpp",
  ".resolved", // Package.resolved, Cartfile.resolved
  ".podspec",
  ".xcmappingmodel",
]);

// Extensionless / special filenames to include (matched case-insensitively)
const ALLOWED_NAMES = new Set([
  "podfile",
  "podfile.lock",
  "cartfile",
  "gemfile",
  "fastfile",
  "appfile",
  "matchfile",
  "deliverfile",
  "snapfile",
  "mintfile",
  "swiftgen.yml",
  ".swiftlint.yml",
  ".swiftformat",
]);

// Files that are listed in the tree/stats but whose contents are NOT dumped
// (binary formats would just produce garbage in the markdown)
const BINARY_EXT = new Set([".xcuserstate"]);

const EXT_TO_LANG = {
  ".js": "JavaScript",
  ".ts": "TypeScript",
  ".jsx": "JSX",
  ".tsx": "TSX",
  ".json": "JSON",
  ".html": "HTML",
  ".css": "CSS",
  ".scss": "SCSS",
  ".md": "Markdown",
  ".ndjson": "NDJSON",
  ".swift": "Swift",
  ".m": "Objective-C",
  ".mm": "Objective-C++",
  ".h": "Header",
  ".c": "C",
  ".cpp": "C++",
  ".plist": "Plist",
  ".xcprivacy": "Privacy Manifest",
  ".entitlements": "Entitlements",
  ".xcconfig": "XCConfig",
  ".xml": "XML",
  ".sh": "Shell",
  ".php": "PHP",
  ".blade.php": "Blade",
  ".astro": "Astro",
  ".vue": "Vue",
  ".svelte": "Svelte",
  // ---- Xcode additions ----
  ".pbxproj": "Xcode Project (pbxproj)",
  ".xcscheme": "Xcode Scheme",
  ".xcworkspacedata": "Xcode Workspace Data",
  ".xcuserstate": "Xcode User State (binary)",
  ".xcsettings": "Xcode Settings",
  ".xcbkptlist": "Xcode Breakpoints",
  ".xctestplan": "Xcode Test Plan",
  ".storyboard": "Storyboard",
  ".xib": "XIB",
  ".strings": "Strings",
  ".stringsdict": "Stringsdict",
  ".xcstrings": "String Catalog",
  ".intentdefinition": "Intent Definition",
  ".metal": "Metal",
  ".pch": "Precompiled Header",
  ".modulemap": "Module Map",
  ".hpp": "C++ Header",
  ".resolved": "Package Resolved",
  ".podspec": "Podspec",
  ".xcmappingmodel": "Core Data Mapping Model",
};

const NAME_TO_LANG = {
  "podfile": "Podfile",
  "podfile.lock": "Podfile Lock",
  "cartfile": "Cartfile",
  "gemfile": "Gemfile",
  "fastfile": "Fastlane",
  "appfile": "Fastlane",
  "matchfile": "Fastlane",
  "deliverfile": "Fastlane",
  "snapfile": "Fastlane",
  "mintfile": "Mintfile",
  "swiftgen.yml": "SwiftGen Config",
  ".swiftlint.yml": "SwiftLint Config",
  ".swiftformat": "SwiftFormat Config",
};

// Single place to decide whether an entry should be skipped
function isIgnored(entry) {
  return IGNORED_DIRS.has(entry.name) || IGNORED_FILES.has(entry.name);
}

// Helper to catch compound extensions like .blade.php
function getFullExtension(filename) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".blade.php")) return ".blade.php";
  return path.extname(lower);
}

// Core Data models store their content in an extensionless file called "contents"
// inside Something.xcdatamodel/
function isXcdatamodelContents(filePath) {
  return (
    path.basename(filePath).toLowerCase() === "contents" &&
    path.basename(path.dirname(filePath)).toLowerCase().endsWith(".xcdatamodel")
  );
}

// Single place to decide whether a file is "tracked" (stats + contents)
function isAllowedFile(filePath) {
  const base = path.basename(filePath).toLowerCase();
  return (
    ALLOWED_EXT.has(getFullExtension(filePath)) ||
    ALLOWED_NAMES.has(base) ||
    isXcdatamodelContents(filePath)
  );
}

function isBinaryFile(filePath) {
  return BINARY_EXT.has(getFullExtension(filePath));
}

function getLanguageName(filePath) {
  const base = path.basename(filePath);
  const ext = getFullExtension(filePath);
  if (base === "Package.swift") return "Swift Package Manifest";
  const byName = NAME_TO_LANG[base.toLowerCase()];
  if (byName) return byName;
  if (isXcdatamodelContents(filePath)) return "Core Data Model";
  return EXT_TO_LANG[ext] || ext.slice(1).toUpperCase();
}

// Adds per-file line numbers (starting at 1 for each file)
function addLineNumbers(content) {
  const lines = content.split(/\r?\n/);

  // Drop the phantom empty line caused by a trailing newline
  if (lines.length > 1 && lines[lines.length - 1] === "") lines.pop();

  const width = String(lines.length).length;
  return lines
    .map((line, i) => `${String(i + 1).padStart(width, " ")} | ${line}`)
    .join("\n");
}

// Tech-specific emoji mapping
function getFileEmoji(filename) {
  const ext = getFullExtension(filename);
  const name = filename.toLowerCase();

  // Apple project files (checked first so names like "App.entitlements"
  // don't fall through to the React "app." rule)
  if (ext === ".xcprivacy") return "🛡️ ";
  if (ext === ".entitlements") return "🔑 ";
  if (ext === ".xcconfig") return "⚙️ ";
  if (ext === ".plist") return "📋 ";
  if (name === "package.swift") return "📦 ";

  // Xcode additions
  if (ext === ".pbxproj") return "🧱 ";
  if (ext === ".xcscheme") return "🎯 ";
  if (ext === ".xcworkspacedata") return "🗂️ ";
  if (ext === ".xcuserstate") return "💾 ";
  if (ext === ".xcsettings") return "🎛️ ";
  if (ext === ".xcbkptlist") return "🔴 ";
  if (ext === ".xctestplan") return "🧪 ";
  if (ext === ".storyboard") return "🎬 ";
  if (ext === ".xib") return "🪟 ";
  if (ext === ".strings" || ext === ".stringsdict") return "🔤 ";
  if (ext === ".xcstrings") return "🌍 ";
  if (ext === ".intentdefinition") return "🎙️ ";
  if (ext === ".metal") return "🔩 ";
  if (ext === ".modulemap" || ext === ".pch") return "🧩 ";
  if (ext === ".resolved") return "📌 ";
  if (ext === ".podspec" || name === "podfile" || name === "podfile.lock")
    return "🍫 ";
  if (name === "swiftgen.yml") return "🧬 ";
  if (name === ".swiftlint.yml" || name === ".swiftformat") return "🧹 ";
  if (name === "cartfile") return "🥕 ";
  if (name === "gemfile" || name.endsWith("file") && ["fastfile","appfile","matchfile","deliverfile","snapfile","mintfile"].includes(name)) return "💎 ";
  if (name === "contents" ) return "🗃️ ";
  if (ext === ".swift") return "🐦 ";
  if (ext === ".m" || ext === ".mm" || ext === ".h" || ext === ".hpp")
    return "🍎 ";

  // React / Frontend Frameworks
  if (
    name.includes("app.") ||
    name.includes("page.") ||
    name.includes("layout.")
  )
    return "📄⚛️ ";
  if (name.includes("component") || name.includes("comp.")) return "🧩 ";
  if (ext === ".ndjson") return "📊 ";
  if (ext === ".astro") return "🚀 ";
  if (ext === ".vue") return "🟩 ";
  if (ext === ".svelte") return "🧡 ";
  if (ext === ".tsx" || ext === ".jsx") return "⚛️ ";
  if (ext === ".ts") return "🔷 ";
  if (ext === ".js") return "🟨 ";

  // Styling
  if (ext === ".css" || ext === ".scss") return "🎨 ";
  if (name.includes("tailwind")) return "🌬️ ";
  if (name.includes("vite.config") || name.includes("astro.config")) return "⚡ ";
  if (name.includes("webpack")) return "📦 ";

  // Config & Data
  if (ext === ".json") return "🔧 ";
  if (name.includes("config") || name.includes("setup")) return "⚙️ ";
  if (name.includes("env")) return "🔒 ";

  // Sanity Studio
  if (name.includes("sanity") || name.includes("schema")) return "🧠 ";
  if (name.includes("desk") || name.includes("structure")) return "📋 ";

  // Backend / PHP / Laravel
  if (ext === ".php" || ext === ".blade.php") return "🐘 ";
  if (name.includes("controller")) return "🎮 ";
  if (name.includes("model")) return "📊 ";
  if (name.includes("route")) return "🛤️ ";

  // Default files
  if (ext === ".md") return "📝 ";
  if (ext === ".sh") return "🐚 ";
  if (ext === ".ndjson") return "📊 ";

  return "📄 ";
}

function getFolderEmoji(folderName) {
  const name = folderName.toLowerCase();

  // Xcode additions (checked first so e.g. "MyTests.xcodeproj" isn't treated as tests)
  if (name.endsWith(".xcodeproj")) return "🛠️ ";
  if (name.endsWith(".xcworkspace")) return "🧰 ";
  if (name.endsWith(".xcassets") || name.endsWith(".xcstickers")) return "🖼️ ";
  if (name.endsWith(".xcdatamodeld") || name.endsWith(".xcdatamodel"))
    return "🗃️ ";
  if (name.endsWith(".playground")) return "🛝 ";
  if (name.endsWith(".xcframework") || name.endsWith(".framework")) return "📦 ";
  if (name.endsWith(".swiftpm")) return "📦 ";
  if (name.endsWith(".lproj")) return "🌍 ";
  if (name === "xcuserdata" || name.endsWith(".xcuserdatad")) return "👤 ";
  if (name === "xcshareddata") return "🤝 ";
  if (name === "xcschemes") return "🎯 ";
  if (name === "sources") return "📂 ";

  if (name === "src" || name === "source") return "📂 ";
  if (name === "components" || name === "comp") return "🧩 ";
  if (name === "pages" || name === "routes") return "📑 ";
  if (name === "layouts") return "🖼️ ";
  if (name === "styles" || name === "css" || name === "scss") return "🎨 ";
  if (name === "public") return "🌐 ";
  if (name === "studio") return "🧠 ";
  if (name === "web") return "🌐 ";
  if (name.includes("sanity")) return "🧠 ";
  if (name.includes("api") || name === "server") return "🔌 ";
  if (name.includes("utils") || name === "lib") return "🛠️ ";
  if (name.includes("assets") || name.includes("images")) return "🖼️ ";
  if (name.includes("tests") || name.includes("__tests__")) return "🧪 ";

  return "📁 ";
}

// Walk function (collects files)
function walk(dir, fileList = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (isIgnored(entry)) continue;

      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, fileList);
      } else {
        fileList.push(fullPath);
      }
    }
  } catch (err) {
    console.warn(`Warning: Could not read ${dir}`);
  }
  return fileList;
}

function writeLine(stream, line = "") {
  stream.write(line + "\n");
}

// Stats
function computeStats(files) {
  const stats = { totalFiles: 0, languages: {} };
  files.forEach((f) => {
    if (!isAllowedFile(f)) return;
    stats.totalFiles++;
    const lang = getLanguageName(f);
    stats.languages[lang] = (stats.languages[lang] || 0) + 1;
  });
  return stats;
}

function formatLanguageStats(stats) {
  const total = stats.totalFiles || 1;
  return Object.entries(stats.languages)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([lang, count]) =>
        `- ${lang}: ${count} files (${((count / total) * 100).toFixed(1)}%)`,
    );
}

// ---- Xcode detection ----------------------------------------------------

// Directory "bundles" that mark an Xcode project
const XCODE_CONTAINERS = {
  ".xcodeproj": "Xcode Projects (.xcodeproj)",
  ".xcworkspace": "Xcode Workspaces (.xcworkspace)",
  ".xcassets": "Asset Catalogs (.xcassets)",
  ".xcdatamodeld": "Core Data Models (.xcdatamodeld)",
  ".playground": "Playgrounds (.playground)",
  ".xcframework": "XCFrameworks (.xcframework)",
  ".swiftpm": "SwiftPM Workspaces (.swiftpm)",
};

// Individual files that matter in an Xcode project
const XCODE_FILE_CATEGORIES = [
  ["Project Files (.pbxproj)", (f) => getFullExtension(f) === ".pbxproj"],
  ["Schemes (.xcscheme)", (f) => getFullExtension(f) === ".xcscheme"],
  ["Workspace Data (.xcworkspacedata)", (f) => getFullExtension(f) === ".xcworkspacedata"],
  ["Test Plans (.xctestplan)", (f) => getFullExtension(f) === ".xctestplan"],
  ["User State (.xcuserstate)", (f) => getFullExtension(f) === ".xcuserstate"],
  ["Workspace Settings (.xcsettings)", (f) => getFullExtension(f) === ".xcsettings"],
  ["Breakpoints (.xcbkptlist)", (f) => getFullExtension(f) === ".xcbkptlist"],
  ["Swift Package Manifests", (f) => path.basename(f) === "Package.swift"],
  ["Package.resolved / Cartfile.resolved", (f) => getFullExtension(f) === ".resolved"],
  ["Storyboards & XIBs", (f) => [".storyboard", ".xib"].includes(getFullExtension(f))],
  ["Entitlements", (f) => getFullExtension(f) === ".entitlements"],
  ["Build Configs (.xcconfig)", (f) => getFullExtension(f) === ".xcconfig"],
  ["Privacy Manifests (.xcprivacy)", (f) => getFullExtension(f) === ".xcprivacy"],
  ["Info.plist files", (f) => path.basename(f).toLowerCase() === "info.plist"],
  ["Localization (.strings / .xcstrings)", (f) => [".strings", ".stringsdict", ".xcstrings"].includes(getFullExtension(f))],
  ["Intent Definitions", (f) => getFullExtension(f) === ".intentdefinition"],
  ["CocoaPods (Podfile / .podspec)", (f) => ["podfile", "podfile.lock"].includes(path.basename(f).toLowerCase()) || getFullExtension(f) === ".podspec"],
];

function collectXcodeArtifacts(files, root) {
  const rel = (p) => path.relative(root, p).split(path.sep).join("/");
  const results = [];

  // Containers (directories) – derived from file paths
  const containerSets = {};
  files.forEach((f) => {
    const parts = rel(f).split("/");
    parts.slice(0, -1).forEach((seg, i) => {
      const ext = path.extname(seg).toLowerCase();
      if (XCODE_CONTAINERS[ext]) {
        (containerSets[ext] = containerSets[ext] || new Set()).add(
          parts.slice(0, i + 1).join("/"),
        );
      }
    });
  });
  Object.keys(XCODE_CONTAINERS).forEach((ext) => {
    if (containerSets[ext]) {
      results.push([XCODE_CONTAINERS[ext], [...containerSets[ext]].sort()]);
    }
  });

  // Individual files
  XCODE_FILE_CATEGORIES.forEach(([label, test]) => {
    const hits = files.filter(test).map(rel).sort();
    if (hits.length) results.push([label, hits]);
  });

  return results;
}

function writeXcodeSummary(stream, artifacts) {
  if (!artifacts.length) return;
  const MAX_LISTED = 25;
  writeLine(stream, "### Xcode Artifacts Detected");
  artifacts.forEach(([label, items]) => {
    writeLine(stream, `- ${label}: ${items.length}`);
    items.slice(0, MAX_LISTED).forEach((item) => writeLine(stream, `  - \`${item}\``));
    if (items.length > MAX_LISTED) {
      writeLine(stream, `  - …and ${items.length - MAX_LISTED} more`);
    }
  });
  writeLine(stream, "");
}

// Smart Tree with emojis
function printTree(dir, prefix = "", stream) {
  try {
    let entries = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((entry) => !isIgnored(entry))
      .sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
      });

    entries.forEach((entry, index) => {
      const isLast = index === entries.length - 1;
      const connector = isLast ? "└── " : "├── ";
      const newPrefix = prefix + (isLast ? "    " : "│   ");

      if (entry.isDirectory()) {
        const emoji = getFolderEmoji(entry.name);
        writeLine(stream, prefix + connector + emoji + entry.name);
        printTree(path.join(dir, entry.name), newPrefix, stream);
      } else {
        const emoji = getFileEmoji(entry.name);
        writeLine(stream, prefix + connector + emoji + entry.name);
      }
    });
  } catch (err) {}
}

// ====================== MAIN ======================
(function main() {
  const args = process.argv.slice(2);
  const NO_CONTENT = args.includes("--no-content");
  const NO_LINE_NUMBERS = args.includes("--no-line-numbers");
  const root = process.cwd();
  const output = fs.createWriteStream(OUTPUT_FILE, { encoding: "utf8" });

  console.log("🔍 Scanning project...");
  const files = walk(root);
  const stats = computeStats(files);

  writeLine(output, "# Project Overview\n");
  writeLine(output, "## Project Summary");
  writeLine(output, `- Total Files (tracked): ${stats.totalFiles}\n`);
  writeLine(output, "### Language Breakdown");
  formatLanguageStats(stats).forEach((line) => writeLine(output, line));
  writeLine(output, "");

  // Xcode detection (only prints if something Xcode-related was found)
  writeXcodeSummary(output, collectXcodeArtifacts(files, root));

  writeLine(output, "## Project Structure\n");
  writeLine(output, "```");
  writeLine(output, ".");
  printTree(root, "", output);
  writeLine(output, "```");

  if (!NO_CONTENT) {
    writeLine(output, "\n# File Contents (selected)\n");
    files.forEach((file) => {
      if (!isAllowedFile(file)) return;
      try {
        let content;
        if (isBinaryFile(file)) {
          const size = fs.statSync(file).size;
          content = `(Binary file, ${size} bytes — contents omitted)`;
        } else {
          content = fs.readFileSync(file, "utf8");
          if (!NO_LINE_NUMBERS) content = addLineNumbers(content);
        }
        writeLine(output, `## \`${path.relative(root, file)}\``);
        writeLine(output, "```");
        writeLine(output, content);
        writeLine(output, "```");
      } catch (e) {}
    });
  } else {
    writeLine(
      output,
      "\n# File Contents\n(Skipped — run without `--no-content` to include)",
    );
  }

  output.end();
  console.log(`✅ Done! Generated → ${OUTPUT_FILE}`);
})();
