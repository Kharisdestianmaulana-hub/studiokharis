#!/bin/bash

# JSON Formatter
sed -i '' 's/bg-\[#DFFF00\] text-black/bg-foreground text-background/g' src/app/\(main\)/toolbox/json-formatter/page.tsx
sed -i '' 's/bg-red-400 text-black/bg-background text-foreground border-[3px] border-dashed border-foreground/g' src/app/\(main\)/toolbox/json-formatter/page.tsx

# Password Generator
sed -i '' 's/bg-\[#DFFF00\] text-black/bg-foreground text-background/g' src/app/\(main\)/toolbox/password-generator/page.tsx

# Word Counter
sed -i '' 's/color: "bg-\[#DFFF00\]"/color: "bg-foreground"/g' src/app/\(main\)/toolbox/word-counter/page.tsx
sed -i '' 's/color: "bg-blue-400"/color: "bg-foreground"/g' src/app/\(main\)/toolbox/word-counter/page.tsx
sed -i '' 's/color: "bg-pink-400"/color: "bg-foreground"/g' src/app/\(main\)/toolbox/word-counter/page.tsx
sed -i '' 's/color: "bg-emerald-400"/color: "bg-foreground"/g' src/app/\(main\)/toolbox/word-counter/page.tsx
sed -i '' 's/text-black \${stat.color}/text-background \${stat.color}/g' src/app/\(main\)/toolbox/word-counter/page.tsx

# Percentage Calculator
sed -i '' 's/bg-\[#DFFF00\] text-black/bg-foreground text-background/g' src/app/\(main\)/toolbox/percentage-calculator/page.tsx
sed -i '' 's/bg-emerald-400 text-black/bg-foreground text-background/g' src/app/\(main\)/toolbox/percentage-calculator/page.tsx

# Color Converter
sed -i '' 's/useState("#DFFF00")/useState("#000000")/g' src/app/\(main\)/toolbox/color-converter/page.tsx

# Contrast Checker
sed -i '' 's/useState("#DFFF00")/useState("#FFFFFF")/g' src/app/\(main\)/toolbox/contrast-checker/page.tsx
sed -i '' "s/bg-emerald-400 text-black/bg-foreground text-background/g" src/app/\(main\)/toolbox/contrast-checker/page.tsx
sed -i '' "s/bg-red-400 text-black/bg-background text-foreground/g" src/app/\(main\)/toolbox/contrast-checker/page.tsx

# Image Compressor
sed -i '' 's/bg-\[#DFFF00\] text-black/bg-foreground text-background/g' src/app/\(main\)/toolbox/image-compressor/page.tsx
sed -i '' 's/bg-black text-white/bg-background text-foreground/g' src/app/\(main\)/toolbox/image-compressor/page.tsx
sed -i '' 's/border-black/border-foreground/g' src/app/\(main\)/toolbox/image-compressor/page.tsx
sed -i '' 's/hover:shadow-\[4px_4px_0_0_#000\]/hover:shadow-\[4px_4px_0_0_var(--foreground)\]/g' src/app/\(main\)/toolbox/image-compressor/page.tsx

# Image Resizer
sed -i '' 's/bg-\[#DFFF00\] text-black/bg-foreground text-background/g' src/app/\(main\)/toolbox/image-resizer/page.tsx
sed -i '' 's/border-black/border-foreground/g' src/app/\(main\)/toolbox/image-resizer/page.tsx
sed -i '' 's/hover:shadow-\[4px_4px_0_0_#000\]/hover:shadow-\[4px_4px_0_0_var(--foreground)\]/g' src/app/\(main\)/toolbox/image-resizer/page.tsx

# Image Converter
sed -i '' 's/bg-\[#DFFF00\] text-black/bg-foreground text-background/g' src/app/\(main\)/toolbox/image-converter/page.tsx
sed -i '' 's/bg-black text-white/bg-background text-foreground/g' src/app/\(main\)/toolbox/image-converter/page.tsx
sed -i '' 's/border-black/border-foreground/g' src/app/\(main\)/toolbox/image-converter/page.tsx
sed -i '' 's/hover:shadow-\[4px_4px_0_0_#000\]/hover:shadow-\[4px_4px_0_0_var(--foreground)\]/g' src/app/\(main\)/toolbox/image-converter/page.tsx

# QR Generator
sed -i '' 's/bg-white/bg-background/g' src/app/\(main\)/toolbox/qr-generator/page.tsx
sed -i '' 's/text-black/text-foreground/g' src/app/\(main\)/toolbox/qr-generator/page.tsx

chmod +x fix_colors.sh
./fix_colors.sh
rm fix_colors.sh
