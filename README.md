# StudioKharis - Modern Developer Portfolio

A highly aesthetic, dynamic, and interactive developer portfolio built by [Kharis](https://github.com/Kharisdestianmaulana-hub). This portfolio is designed not just to showcase projects, but to serve as a testament to advanced front-end engineering, state management, and modern UI/UX principles.

## ✨ Key Features

- **Global Search (Command Palette)**: A powerful, unified search interface (accessible via `Ctrl+K` or `Cmd+K`) that instantly queries and filters all database items, including projects, articles, tech stacks, and open-source contributions.
- **Dynamic Nav Widget**: An interactive, rotating top navigation widget that cycles between breadcrumb trails, real-time local timezone clock, and dynamic time-based greetings.
- **Dynamic Theme & Favicon**: Deep dark/light mode integration where not only the UI theme swaps seamlessly, but the browser tab's favicon dynamically matches the chosen theme in real-time.
- **Headless CMS Integration**: All content (projects, experiences, articles) is decoupled and served securely via **Appwrite** API, allowing for instant, zero-redeploy content updates.
- **Micro-Animations**: Smooth, 60fps transitions and interactive micro-animations powered by `framer-motion` and Tailwind utility classes.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & Radix UI
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database / CMS**: [Appwrite](https://appwrite.io/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Kharisdestianmaulana-hub/studiokharis.git
cd studiokharis
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your Appwrite configurations (refer to the internal API Integration Guide):
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
# ...other collection IDs
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
