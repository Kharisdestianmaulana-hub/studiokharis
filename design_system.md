# Design System

Version: 1.0.0

Last Updated: July 2026

---

# Overview

Portfolio ini dirancang sebagai platform personal branding yang menampilkan pengalaman, proyek, artikel, aktivitas, dan pencapaian dalam satu tempat.

Inspirasi utama berasal dari:

- LinkedIn
- GitHub
- Linear
- Notion
- Apple Human Interface Guidelines

Tujuan utama desain adalah membuat pengunjung fokus pada konten tanpa gangguan visual yang berlebihan.

---

# Design Principles

## Content First

Konten merupakan elemen utama.

Visual hanya berfungsi mendukung informasi.

Prioritaskan keterbacaan dibanding dekorasi.

---

## Professional

Tampilan harus terasa profesional, modern, dan bersih.

Hindari warna berlebihan maupun elemen yang terlalu ramai.

---

## Consistency

Seluruh halaman menggunakan aturan spacing, radius, typography, dan warna yang konsisten.

Tidak diperbolehkan membuat komponen dengan ukuran yang berbeda tanpa alasan.

---

## Simplicity

Setiap komponen memiliki satu tujuan.

Hilangkan elemen yang tidak memberikan nilai kepada pengguna.

---

## Accessibility

Semua komponen harus dapat digunakan menggunakan keyboard.

Contrast ratio minimal mengikuti WCAG AA.

Target sentuhan minimal 44x44px.

---

## Responsive

Seluruh halaman harus nyaman digunakan mulai dari mobile hingga monitor ultrawide.

---

# Brand Personality

Portfolio ini memiliki karakter:

- Professional
- Clean
- Friendly
- Modern
- Open Source
- Minimalist

---

# Color System

## Primary

#111827

Digunakan untuk:

- Heading
- Button Primary
- Navigation aktif

---

## Secondary

#374151

Digunakan untuk:

- Sub Heading
- Secondary Text

---

## Accent

#2563EB

Digunakan untuk:

- Link
- Badge aktif
- Highlight

---

## Background

#FAFAFA

Background utama website.

---

## Surface

#FFFFFF

Background Card.

---

## Border

#E5E7EB

Seluruh border menggunakan warna ini.

---

## Muted

#6B7280

Digunakan pada caption, label, metadata.

---

## Success

#22C55E

---

## Warning

#F59E0B

---

## Danger

#EF4444

---

# Dark Theme

Background

#09090B

Surface

#18181B

Border

#27272A

Primary Text

#FAFAFA

Secondary Text

#D4D4D8

Muted

#A1A1AA

Accent

#3B82F6

---

# Typography

Primary Font

Geist

Fallback

Inter

System UI

---

## Display

48px

Weight

700

Line Height

120%

---

## H1

36px

700

---

## H2

30px

700

---

## H3

24px

600

---

## Title

20px

600

---

## Body Large

18px

400

---

## Body

16px

400

---

## Small

14px

400

---

## Caption

12px

400

---

# Spacing Scale

Gunakan spacing berikut.

4

8

12

16

20

24

32

40

48

64

80

96

120

160

Jangan menggunakan nilai spacing di luar daftar kecuali benar-benar diperlukan.

---

# Border Radius

Extra Small

6px

Small

8px

Medium

12px

Large

16px

Extra Large

20px

Pill

999px

---

# Border

Width

1px

Color

Border Color

---

# Shadow

Gunakan shadow seminimal mungkin.

Small

0 1px 2px rgba(0,0,0,.05)

Medium

0 6px 12px rgba(0,0,0,.08)

Large

0 12px 24px rgba(0,0,0,.10)

Prioritaskan Border dibanding Shadow.

---

# Motion

Semua animasi harus terasa natural.

Hover

150ms

Normal

200ms

Dialog

250ms

Page Transition

300ms

Easing

ease-out

---

# Grid System

Desktop

12 Columns

Max Width

1440px

Content Width

1200px

Gap

24px

Padding

32px

---

Tablet

8 Columns

Gap

20px

Padding

24px

---

Mobile

4 Columns

Gap

16px

Padding

16px

---

# Layout

## Sidebar

Lebar

280px

Sticky

Ya

Scrollable

Ya

---

## Top Navigation

Height

72px

Sticky

Ya

---

## Main Content

Centered

Max Width

1200px

---

# Components

## Button

### Primary

Background

Primary

Text

White

Height

40px

Radius

10px

Hover

Opacity 90%

---

### Secondary

Background

White

Border

Border Color

Text

Primary

---

### Ghost

Transparent

Hover Background

Gray 100

---

### Icon Button

Square

40x40

Radius

10px

---

# Card

Background

Surface

Radius

16px

Padding

24px

Border

1px

Shadow

None

Hover

TranslateY(-2px)

Transition

200ms

---

# Avatar

Available Sizes

32

40

56

72

96

128

Radius

Full

---

# Badge

Height

28px

Radius

999px

Padding Horizontal

12px

Gunakan warna soft.

---

# Input

Height

44px

Radius

10px

Border

1px

Focus

Accent

---

# Textarea

Minimum Height

120px

Resize

Vertical

---

# Dropdown

Radius

10px

Shadow

Small

Padding

8px

---

# Modal

Radius

20px

Max Width

640px

Animation

Fade + Scale

---

# Tabs

Indicator

Bottom Border

Height

2px

---

# Tooltip

Radius

8px

Padding

8px

---

# Toast

Position

Bottom Right

Radius

12px

---

# Timeline

Experience menggunakan Timeline.

Node

Circle

Connection

Vertical Line

Card

Optional

---

# Project Card

Setiap project harus memiliki:

Thumbnail

Project Name

Description

Tech Stack

Status

Links

Date

Optional Metrics

---

# Profile Header

Berisi:

Cover Image

Avatar

Name

Role

Location

Social Links

Website

Contact

CTA Button

---

# Sidebar Navigation

Menu utama:

Home

About

Experience

Projects

Articles

Tech Stack

Certificates

Activity

Contact

Settings

---

# Home Page Structure

Hero

↓

About

↓

Featured Projects

↓

Experience

↓

Tech Stack

↓

Articles

↓

Certificates

↓

Timeline

↓

Contact

↓

Footer

---

# Project Detail Page

Cover

Overview

Gallery

Features

Tech Stack

Challenges

Lessons Learned

GitHub

Live Demo

Related Projects

---

# Blog Layout

Hero

↓

Article

↓

Table of Contents

↓

Code Block

↓

Related Articles

---

# Iconography

Gunakan

Lucide Icons

Ukuran

16

20

24

28

32

---

# Illustration

Gunakan ilustrasi seminimal mungkin.

Prioritaskan screenshot project asli.

---

# Images

Gunakan aspect ratio:

16:9

4:3

1:1

Semua gambar menggunakan radius 16px.

---

# Responsive Rules

Desktop

Sidebar tetap tampil.

---

Tablet

Sidebar collapse.

---

Mobile

Sidebar menjadi Drawer.

Bottom Navigation opsional.

---

# Accessibility

Contrast minimal

4.5:1

Keyboard Navigation

Required

Visible Focus Ring

Required

ARIA Label

Required

Screen Reader Friendly

Required

---

# Performance

Target Lighthouse

Performance

95+

Accessibility

100

Best Practice

100

SEO

100

---

# Naming Convention

Component

PascalCase

Example

ProjectCard

HeroSection

ProfileHeader

---

CSS Variables

kebab-case

Example

--color-primary

--radius-lg

--spacing-xl

---

# Design Tokens

Colors

--color-primary

--color-secondary

--color-accent

--color-background

--color-surface

--color-border

--color-muted

Spacing

--space-4

--space-8

--space-12

--space-16

--space-24

--space-32

--space-48

Radius

--radius-sm

--radius-md

--radius-lg

Typography

--font-family

--font-display

--font-body

Shadow

--shadow-sm

--shadow-md

--shadow-lg

---

# Interaction Rules

Hover

Gunakan perubahan kecil.

Tidak boleh menggunakan animasi berlebihan.

---

Loading

Gunakan Skeleton Loading.

---

Empty State

Harus memiliki:

Illustration

Description

Action Button

---

Error State

Harus menjelaskan masalah secara jelas.

Berikan solusi kepada pengguna.

---

# Writing Style

Gunakan bahasa yang:

Singkat

Jelas

Profesional

Ramah

Hindari istilah teknis yang tidak diperlukan.

---

# Future Features

Portfolio akan mendukung:

- Dark Mode
- Multi Language
- CMS
- Project Analytics
- GitHub Integration
- Blog
- Resume Generator
- Contact Form
- Testimonials
- Timeline Activity
- Achievement System
- Visitor Statistics

---

# Inspiration

LinkedIn

GitHub

Linear

Notion

Apple

Vercel

Stripe

---

# Core Philosophy

"Great design disappears behind great content."

Portfolio bukan dibuat agar terlihat mewah, tetapi agar karya, pengalaman, dan keahlian menjadi pusat perhatian.

Semua keputusan desain harus mendukung tujuan tersebut.
