#!/bin/bash

# Script to fix the WorkCarousel.tsx permissions

# First, create a backup of the existing file
echo "Creating backup of WorkCarousel.tsx..."
cp /mnt/tmp-projects/project-9058/src/components/home/WorkCarousel.tsx /mnt/tmp-projects/project-9058/src/components/home/WorkCarousel.tsx.bak 2>/dev/null

# Now copy the backup file to a temporary location
echo "Moving backup to temporary file..."
if [ -f "/mnt/tmp-projects/project-9058/src/components/home/WorkCarousel.backup.tsx" ]; then
  # We already have a backup file created by Claude
  cp /mnt/tmp-projects/project-9058/src/components/home/WorkCarousel.backup.tsx /tmp/WorkCarousel.tmp
else
  # Try to get the content from the existing file
  cat /mnt/tmp-projects/project-9058/src/components/home/WorkCarousel.tsx > /tmp/WorkCarousel.tmp 2>/dev/null
fi

# Try to replace the original file with our copy
echo "Replacing the problematic file with a new copy..."
mv /tmp/WorkCarousel.tmp /mnt/tmp-projects/project-9058/src/components/home/WorkCarousel.tsx 2>/dev/null

# Set appropriate permissions
echo "Setting proper permissions..."
chmod 664 /mnt/tmp-projects/project-9058/src/components/home/WorkCarousel.tsx 2>/dev/null

echo "Done! Please check if the WorkCarousel component works now."
echo "If it's still not working, you can manually copy from WorkCarousel.backup.tsx"