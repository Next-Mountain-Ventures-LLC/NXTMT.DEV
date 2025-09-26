#!/bin/bash

# Script to fix permissions for all components in the project

# Function to update permissions for a file
fix_permissions() {
  local file="$1"
  echo "Fixing permissions for $file"
  if [ -f "$file" ]; then
    chmod 664 "$file" 2>/dev/null
    echo "✓ Done"
  else
    echo "✗ File not found"
  fi
}

# Function to update permissions for all files in a directory
fix_directory_permissions() {
  local dir="$1"
  echo "Fixing permissions for directory: $dir"
  if [ -d "$dir" ]; then
    find "$dir" -type f -name "*.tsx" -o -name "*.ts" -o -name "*.astro" -exec chmod 664 {} \; 2>/dev/null
    echo "✓ Done"
  else
    echo "✗ Directory not found"
  fi
}

# Main script
echo "===== Fixing file permissions ====="
echo "This script will update permissions for component files that may be causing issues."

# Fix WorkCarousel component specifically
fix_permissions "/mnt/tmp-projects/project-9058/src/components/home/WorkCarousel.tsx"

# Fix all component directories
echo
echo "Fixing permissions for all components..."
fix_directory_permissions "/mnt/tmp-projects/project-9058/src/components"
fix_directory_permissions "/mnt/tmp-projects/project-9058/src/layouts"
fix_directory_permissions "/mnt/tmp-projects/project-9058/src/pages"

echo
echo "===== Permission Update Complete ====="
echo
echo "If you continue to experience issues with the WorkCarousel component,"
echo "you can use one of these alternatives:"
echo
echo "1. Use the backup version:"
echo "   - Rename /mnt/tmp-projects/project-9058/src/components/home/WorkCarousel.backup.tsx to WorkCarousel.tsx"
echo
echo "2. Use the simplified version:"
echo "   - Update your index.astro to import SimpleWorkCarousel instead of WorkCarousel:"
echo "   - Change: import WorkCarousel from \"@/components/home/WorkCarousel\";"
echo "   - To: import WorkCarousel from \"@/components/home/SimpleWorkCarousel\";"
echo
echo "3. If needed, restart the development server:"
echo "   npm run dev"
echo