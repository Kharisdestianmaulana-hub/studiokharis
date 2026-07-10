# RiRay Hub — API Integration Guide

> **Buku panduan lengkap** untuk mengintegrasikan data dari **RiRay Hub Headless CMS** ke project lain.
> Dokumen ini ditujukan untuk AI assistant maupun developer yang menangani project penerima data.

---

## Daftar Isi

1. [Arsitektur Sistem](#1-arsitektur-sistem)
2. [Setup & Konfigurasi](#2-setup--konfigurasi)
3. [Collections & Schema](#3-collections--schema)
4. [Kode Integrasi (SDK)](#4-kode-integrasi-sdk)
5. [REST API (Tanpa SDK)](#5-rest-api-tanpa-sdk)
6. [Query Patterns](#6-query-patterns)
7. [Best Practices](#7-best-practices)

---

## 1. Arsitektur Sistem

```
┌──────────────────────────────────────────────────────────┐
│                    RiRay Hub (CMS)                        │
│        Vite + React + TypeScript + TailwindCSS            │
│   Tempat owner mengelola SEMUA konten secara terpusat     │
└────────────────────────┬─────────────────────────────────┘
                         │ WRITE (authenticated)
                         ▼
              ┌─────────────────────┐
              │   Appwrite Cloud    │
              │   (Database + Auth) │
              └──────┬──────────────┘
                     │ READ (public, read-only)
          ┌──────────┼──────────┐
          ▼          ▼          ▼
     ┌─────────┐ ┌────────┐ ┌─────────────┐
     │Portfolio │ │ShiftOS │ │ Project X   │
     │  Web     │ │  Web   │ │ (any web/   │
     │          │ │        │ │  mobile app)│
     └─────────┘ └────────┘ └─────────────┘
```

**Prinsip utama:** Tulis data SEKALI di RiRay Hub, konsumsi dari project MANAPUN.

---

## 2. Setup & Konfigurasi

### 2.1 Credentials

Berikut credential yang dibutuhkan untuk connect ke Appwrite (READ ONLY):

| Variable          | Deskripsi                   | Contoh Value               |
|-------------------|-----------------------------|-----------------------------|
| `ENDPOINT`        | Appwrite API endpoint       | `https://cloud.appwrite.io/v1` |
| `PROJECT_ID`      | ID Project Appwrite         | *(tanyakan ke owner)*       |
| `DATABASE_ID`     | ID Database utama           | *(tanyakan ke owner)*       |

> **Penting:** Collection ID sudah bersifat tetap dan tercantum di dokumen ini. Yang perlu ditanyakan hanya PROJECT_ID dan DATABASE_ID.

### 2.2 Install SDK (Node.js / React / Next.js / Vue)

```bash
npm install appwrite
```

### 2.3 Inisialisasi Client

```typescript
import { Client, Databases, Query } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('PROJECT_ID_DISINI');

const databases = new Databases(client);
const DATABASE_ID = 'DATABASE_ID_DISINI';
```

---

## 3. Collections & Schema

### 3.1 `public_bio` — Profil / Identitas

Hanya 1 dokumen (singleton).

| Field         | Type     | Deskripsi                          |
|---------------|----------|------------------------------------|
| `name`        | string   | Nama lengkap                       |
| `tagline`     | string   | Tagline/subtitle profil            |
| `about`       | string   | Bio / deskripsi diri               |
| `avatar_url`  | string   | URL foto profil                    |
| `email`       | string   | Email kontak                       |
| `github_url`  | string   | URL profil GitHub                  |
| `linkedin_url`| string   | URL profil LinkedIn                |

---

### 3.2 `public_experiences` — Experience CV

| Field         | Type     | Deskripsi                                    |
|---------------|----------|----------------------------------------------|
| `company`     | string   | Nama perusahaan/institusi                    |
| `role`        | string   | Posisi/jabatan/jurusan                       |
| `period`      | string   | Periode waktu (e.g. "Jan 2024 - Present")    |
| `address`     | string   | Alamat lokasi (opsional)                     |
| `description` | string   | Deskripsi tugas/detail                       |
| `type`        | string   | Kategori: `Work`, `Education`, `Certification`, `Internship`, `Volunteer` |

---

### 3.3 `public_articles` — Artikel / Devlog

| Field            | Type     | Deskripsi                                  |
|------------------|----------|--------------------------------------------|
| `title`          | string   | Judul artikel                              |
| `content`        | string   | Isi artikel (HTML/Markdown)                |
| `cover_image`    | string   | URL gambar cover                           |
| `tags`           | string   | Tag artikel (comma-separated)              |
| `is_published`   | boolean  | `true` = dipublikasikan, `false` = draft   |
| `target_website` | string   | Nama web tujuan (e.g. "portfolio", "shiftos") |

> **Filtering wajib:** Selalu filter `is_published = true` dan `target_website = 'nama-web-kamu'`

---

### 3.4 `public_techstack` — Tech Radar / Skills

| Field         | Type     | Deskripsi                              |
|---------------|----------|----------------------------------------|
| `name`        | string   | Nama teknologi/skill                   |
| `category`    | string   | Kategori (e.g. "Frontend", "Backend")  |
| `proficiency` | number   | Level kemahiran (0-100)                |

---

### 3.5 `projects` — Project Portfolio

Collection ID ditentukan via env var (bukan hardcoded). Tanyakan ke owner.

| Field            | Type     | Deskripsi                               |
|------------------|----------|-----------------------------------------|
| `title`          | string   | Nama proyek                             |
| `category`       | string   | Kategori proyek                         |
| `tech_stack`     | string   | Stack teknologi (comma-separated)       |
| `status`         | string   | Status: `Planning`, `In-Progress`, `Completed`, `Archived` |
| `visibility`     | boolean  | `true` = publik                         |
| `content_body`   | string   | Deskripsi proyek                        |
| `cover_image_id` | string   | ID/URL gambar cover                     |

---

### 3.6 `public_gallery` — Art & Media Gallery

| Field         | Type     | Deskripsi                          |
|---------------|----------|------------------------------------|
| `title`       | string   | Judul karya                        |
| `image_url`   | string   | URL gambar/GIF                     |
| `category`    | string   | Kategori (e.g. "3D", "UI", "Art")  |
| `link_url`    | string   | URL eksternal (opsional)           |

---

### 3.7 `public_testimonials` — Testimoni & Endorsement

| Field          | Type     | Deskripsi                          |
|----------------|----------|------------------------------------|
| `author_name`  | string   | Nama pemberi testimoni             |
| `author_role`  | string   | Jabatan/posisi pemberi             |
| `content`      | string   | Isi testimoni                      |
| `author_image` | string   | URL foto pemberi (opsional)        |

---

### 3.8 `public_services` — Layanan Freelance

| Field          | Type     | Deskripsi                             |
|----------------|----------|---------------------------------------|
| `service_name` | string   | Nama layanan                          |
| `description`  | string   | Deskripsi layanan                     |
| `base_price`   | string   | Harga dasar (string, bisa "Rp 500k") |
| `is_active`    | boolean  | `true` = sedang dibuka                |

> **Filtering wajib:** Selalu filter `is_active = true` saat menampilkan ke publik.

---

### 3.9 `public_social_links` — Social Media Links

| Field         | Type     | Deskripsi                                       |
|---------------|----------|-------------------------------------------------|
| `platform`    | string   | Nama platform (GitHub, LinkedIn, Instagram, dll) |
| `url`         | string   | URL profil lengkap                              |
| `username`    | string   | Username/handle                                 |
| `order_index` | integer  | Urutan tampil (ascending)                       |

---

### 3.10 `changelogs` — Changelog / Release Notes

| Field          | Type     | Deskripsi                                      |
|----------------|----------|-------------------------------------------------|
| `project_id`   | string   | ID project (dari collection Projects, atau manual) |
| `project_name` | string   | Nama project (key utama untuk filtering)       |
| `version`      | string   | Versi (e.g. "v1.0.0")                          |
| `release_date` | string   | Tanggal rilis (YYYY-MM-DD)                     |
| `type`         | string   | Tipe: `Release`, `Feature`, `Bugfix`, `Improvement`, `Breaking Change` |
| `description`  | string   | Deskripsi perubahan                            |

> **Filtering wajib:** Selalu filter `project_name = 'NamaProject'` untuk mengambil changelog project tertentu.

---

## 4. Kode Integrasi (SDK)

### 4.1 Fetch Bio (Singleton)

```typescript
const fetchBio = async () => {
  const response = await databases.listDocuments(DATABASE_ID, 'public_bio');
  return response.documents[0]; // hanya 1 dokumen
};
```

### 4.2 Fetch Experience CV

```typescript
// Semua pengalaman
const fetchAllExperience = async () => {
  const response = await databases.listDocuments(DATABASE_ID, 'public_experiences', [
    Query.orderDesc('$createdAt')
  ]);
  return response.documents;
};

// Filter per kategori
const fetchByType = async (type: 'Work' | 'Education' | 'Certification' | 'Internship' | 'Volunteer') => {
  const response = await databases.listDocuments(DATABASE_ID, 'public_experiences', [
    Query.equal('type', type),
    Query.orderDesc('$createdAt')
  ]);
  return response.documents;
};
```

### 4.3 Fetch Artikel (Filter by Target Website)

```typescript
const fetchArticles = async (targetWeb: string) => {
  const response = await databases.listDocuments(DATABASE_ID, 'public_articles', [
    Query.equal('target_website', targetWeb),
    Query.equal('is_published', true),
    Query.orderDesc('$createdAt')
  ]);
  return response.documents;
};

// Pemanggilan:
// fetchArticles('portfolio')
// fetchArticles('shiftos')
```

### 4.4 Fetch Tech Stack

```typescript
const fetchSkills = async () => {
  const response = await databases.listDocuments(DATABASE_ID, 'public_techstack', [
    Query.limit(100),
    Query.orderDesc('proficiency')
  ]);
  return response.documents;
};
```

### 4.5 Fetch Projects

```typescript
const fetchProjects = async () => {
  const response = await databases.listDocuments(DATABASE_ID, 'COLLECTION_ID_PROJECTS', [
    Query.orderDesc('$createdAt')
  ]);
  return response.documents;
};
```

> **Note:** Collection ID untuk Projects dikonfigurasi via env var. Tanyakan ke owner.

### 4.6 Fetch Gallery

```typescript
const fetchGallery = async () => {
  const response = await databases.listDocuments(DATABASE_ID, 'public_gallery', [
    Query.orderDesc('$createdAt')
  ]);
  return response.documents;
};
```

### 4.7 Fetch Testimonials

```typescript
const fetchTestimonials = async () => {
  const response = await databases.listDocuments(DATABASE_ID, 'public_testimonials', [
    Query.orderDesc('$createdAt')
  ]);
  return response.documents;
};
```

### 4.8 Fetch Services (Active Only)

```typescript
const fetchServices = async () => {
  const response = await databases.listDocuments(DATABASE_ID, 'public_services', [
    Query.equal('is_active', true),
    Query.orderDesc('$createdAt')
  ]);
  return response.documents;
};
```

### 4.9 Fetch Social Links

```typescript
const fetchSocialLinks = async () => {
  const response = await databases.listDocuments(DATABASE_ID, 'public_social_links', [
    Query.orderAsc('order_index'),
    Query.limit(50)
  ]);
  return response.documents;
};
```

### 4.10 Fetch Changelogs (Per Project)

```typescript
const fetchChangelogs = async (projectName: string) => {
  const response = await databases.listDocuments(DATABASE_ID, 'changelogs', [
    Query.equal('project_name', projectName),
    Query.orderDesc('$createdAt'),
    Query.limit(50)
  ]);
  return response.documents;
};

// Pemanggilan:
// fetchChangelogs('ShiftOS')
// fetchChangelogs('Portfolio')
// fetchChangelogs('DFC Cirebon')
```

---

## 5. REST API (Tanpa SDK)

Untuk project yang tidak menggunakan Node.js (PHP, WordPress, static HTML, Python, dll), gunakan REST API langsung:

### 5.1 Format URL

```
GET https://cloud.appwrite.io/v1/databases/{DATABASE_ID}/collections/{COLLECTION_ID}/documents
```

### 5.2 Header Wajib

```
X-Appwrite-Project: {PROJECT_ID}
```

### 5.3 Query Parameters

Gunakan `queries[]` sebagai URL parameter:

```
?queries[]={"method":"equal","attribute":"type","values":["Education"]}
&queries[]={"method":"orderDesc","attribute":"$createdAt"}
```

### 5.4 Contoh Vanilla JavaScript (Fetch API)

```javascript
const ENDPOINT = 'https://cloud.appwrite.io/v1';
const PROJECT_ID = 'PROJECT_ID_DISINI';
const DATABASE_ID = 'DATABASE_ID_DISINI';

async function fetchCollection(collectionId, queries = []) {
  const queryString = queries
    .map(q => 'queries[]=' + encodeURIComponent(JSON.stringify(q)))
    .join('&');

  const url = `${ENDPOINT}/databases/${DATABASE_ID}/collections/${collectionId}/documents${queryString ? '?' + queryString : ''}`;

  const response = await fetch(url, {
    headers: { 'X-Appwrite-Project': PROJECT_ID }
  });

  const data = await response.json();
  return data.documents;
}

// Contoh penggunaan:
const bio = await fetchCollection('public_bio');
const skills = await fetchCollection('public_techstack', [
  { method: 'limit', values: [100] },
  { method: 'orderDesc', attribute: 'proficiency' }
]);
const changelogs = await fetchCollection('changelogs', [
  { method: 'equal', attribute: 'project_name', values: ['ShiftOS'] }
]);
```

### 5.5 Contoh PHP (cURL)

```php
<?php
function fetchFromHub($collectionId, $queries = []) {
    $endpoint = 'https://cloud.appwrite.io/v1';
    $projectId = 'PROJECT_ID_DISINI';
    $databaseId = 'DATABASE_ID_DISINI';

    $url = "$endpoint/databases/$databaseId/collections/$collectionId/documents";

    if (!empty($queries)) {
        $params = [];
        foreach ($queries as $q) {
            $params[] = 'queries[]=' . urlencode(json_encode($q));
        }
        $url .= '?' . implode('&', $params);
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "X-Appwrite-Project: $projectId"
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response, true);
    return $data['documents'] ?? [];
}

// Contoh:
$bio = fetchFromHub('public_bio');
$changelogs = fetchFromHub('changelogs', [
    ['method' => 'equal', 'attribute' => 'project_name', 'values' => ['ShiftOS']]
]);
?>
```

---

## 6. Query Patterns

### 6.1 Query yang Sering Digunakan

| Pattern                                   | Deskripsi                        |
|-------------------------------------------|----------------------------------|
| `Query.equal('field', 'value')`           | Filter exact match               |
| `Query.orderDesc('$createdAt')`           | Urutkan terbaru dulu             |
| `Query.orderAsc('order_index')`           | Urutkan berdasarkan urutan manual |
| `Query.limit(100)`                        | Batasi jumlah hasil              |
| `Query.equal('is_published', true)`       | Hanya yang dipublikasikan        |
| `Query.equal('is_active', true)`          | Hanya yang sedang aktif          |
| `Query.equal('type', 'Education')`        | Filter experience by type        |
| `Query.equal('target_website', 'portfolio')` | Filter artikel per web target |
| `Query.equal('project_name', 'ShiftOS')` | Filter changelog per project     |

### 6.2 Kombinasi Query

```typescript
// Artikel portfolio yang sudah dipublish, urutkan terbaru
[
  Query.equal('target_website', 'portfolio'),
  Query.equal('is_published', true),
  Query.orderDesc('$createdAt'),
  Query.limit(10)
]
```

---

## 7. Best Practices

### 7.1 Permission di Appwrite
- Pastikan setiap collection **publik** memiliki **Read permission = "Any"**
- Collection internal (expenses, logs, concepts, bookmarks, roadmaps) **JANGAN** diset publik

### 7.2 Collection yang Boleh Diekspos Publik

| Collection            | Publik?  | Alasan                            |
|-----------------------|----------|-----------------------------------|
| `public_bio`          | Ya       | Data profil untuk web             |
| `public_experiences`  | Ya       | CV / resume publik                |
| `public_articles`     | Ya       | Blog/devlog publik                |
| `public_techstack`    | Ya       | Skills publik                     |
| `projects`            | Ya       | Portfolio publik                  |
| `public_gallery`      | Ya       | Karya visual publik               |
| `public_testimonials` | Ya       | Testimoni publik                  |
| `public_services`     | Ya       | Layanan freelance publik          |
| `public_social_links` | Ya       | Link sosmed publik                |
| `changelogs`          | Ya       | Release notes publik              |
| `expenses`            | **TIDAK**| Data keuangan pribadi             |
| `logs`                | **TIDAK**| Jurnal pribadi                    |
| `concepts`            | **TIDAK**| Ide/konsep pribadi                |
| `bookmarks`           | **TIDAK**| Bookmark pribadi                  |
| `roadmaps`            | **TIDAK**| Roadmap internal                  |

### 7.3 Caching
- Data dari CMS jarang berubah (bio, skills, projects). Implement client-side caching atau ISR (Incremental Static Regeneration) di Next.js.
- Untuk artikel, gunakan `$updatedAt` field untuk cache invalidation.

### 7.4 Error Handling
```typescript
try {
  const data = await fetchBio();
  // handle data
} catch (error) {
  // Appwrite will return 404 jika collection tidak ada
  // atau 401 jika permission tidak diset
  console.error('Failed to fetch from RiRay Hub:', error);
}
```

### 7.5 TypeScript Interfaces

Jika project tujuan menggunakan TypeScript, copy interface berikut:

```typescript
interface Bio {
  $id: string;
  name: string;
  tagline: string;
  about: string;
  avatar_url: string;
  email: string;
  github_url: string;
  linkedin_url: string;
}

interface Experience {
  $id: string;
  company: string;
  role: string;
  period: string;
  address: string;
  description: string;
  type: 'Work' | 'Education' | 'Certification' | 'Internship' | 'Volunteer';
}

interface Article {
  $id: string;
  title: string;
  content: string;
  cover_image: string;
  tags: string;
  is_published: boolean;
  target_website: string;
  $createdAt: string;
}

interface TechStack {
  $id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface Project {
  $id: string;
  title: string;
  category: string;
  tech_stack: string;
  status: 'Planning' | 'In-Progress' | 'Completed' | 'Archived';
  visibility: boolean;
  content_body: string;
  cover_image_id: string;
}

interface GalleryItem {
  $id: string;
  title: string;
  image_url: string;
  category: string;
  link_url?: string;
}

interface Testimonial {
  $id: string;
  author_name: string;
  author_role: string;
  content: string;
  author_image?: string;
}

interface Service {
  $id: string;
  service_name: string;
  description: string;
  base_price: string;
  is_active: boolean;
}

interface SocialLink {
  $id: string;
  platform: string;
  url: string;
  username: string;
  order_index: number;
}

interface ChangelogEntry {
  $id: string;
  project_id: string;
  project_name: string;
  version: string;
  release_date: string;
  type: 'Release' | 'Feature' | 'Bugfix' | 'Improvement' | 'Breaking Change';
  description: string;
  $createdAt: string;
}
```

---

> **Dokumen ini di-maintain oleh RiRay Hub.**
> Last updated: 2026-05-02
