# 🚀 Dynamic Form Renderer

A modern, customizable, and fully dynamic form renderer built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.  
Easily render forms from a schema, validate user input, and display submitted data — all with a beautiful dark, gradient-centered UI.

---

## ✨ Features

- ⚡ **Instant Form Rendering** from a JSON schema
- 🎨 **Modern Dark UI** with Tailwind CSS and gradients
- 🧩 **Supports Multiple Field Types**: text, number, checkbox, select
- 🛡️ **Validation & Error Handling** out of the box
- 🔄 **Reset & Submit** with instant feedback
- 🧪 **Ready for Testing** with Vitest & React Testing Library

---

## 📸 Preview

![Dynamic Form Screenshot](./screenshot.png) <!-- Add a screenshot if available -->

---

## 🏗️ Project Structure

```
dynamic-form-renderer/
├── src/
│   ├── components/
│   │   ├── DynamicForm.tsx
│   │   └── formFields/
│   │       ├── Input.tsx
│   │       ├── Number.tsx
│   │       ├── Checkbox.tsx
│   │       └── Select.tsx
│   ├── hooks/
│   │   └── useForm.ts
│   ├── types/
│   │   └── schema.ts
│   ├── main.tsx
│   ├── App.tsx
│   └── output.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🛠️ Getting Started

### 1. 📦 Install Dependencies

```sh
npm install
```

### 2. 🏃‍♂️ Run the App

```sh
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see your app!

### 3. 🧪 Run Tests

We recommend installing an extension to run vitest tests.

Or run from the terminal:

```sh
npm run test
```

---

## 📝 Usage

### Define a Schema

```ts
const schema = {
  title: "User Registration",
  fields: [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "age", label: "Age", type: "number" },
    { name: "newsletter", label: "Subscribe?", type: "checkbox" },
    { name: "role", label: "Role", type: "select", options: ["User", "Admin"] }
  ]
};
```

### Render the Form

```tsx
import DynamicForm from './components/DynamicForm';

<DynamicForm schema={schema} />
```

---

## 🎨 Customization

- **Styling:** Uses Tailwind CSS for all styling. Edit `output.css` or Tailwind config for custom themes.
- **Fields:** Add new field types by extending the `formFields` folder and updating the schema/types.

---

## 🧑‍💻 Development

- **Vite** for fast dev server and builds
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **Vitest** for unit testing

---

## 📂 Important Scripts

| Script         | Description                |
| -------------- | ------------------------- |
| `dev`          | Start dev server          |
| `build`        | Build for production      |
| `preview`      | Preview production build  |
| `test`         | Run unit tests            |

---

## 🐛 Troubleshooting

- **Styles not applying?**  
  Make sure `output.css` is imported in `main.tsx` and Tailwind is properly configured.  
  Rebuild CSS with:  
  ```sh
  npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
  ```

- **Git issues?**  
  If you see "refusing to merge unrelated histories", use:  
  ```sh
  git pull origin main --allow-unrelated-histories
  ```

---

## 🤝 Contributing

Pull requests and issues are welcome!  
Please open an issue to discuss your ideas or report bugs.

---

## 📜 License

MIT

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)

---