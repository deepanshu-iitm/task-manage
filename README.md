## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/deepanshu-iitm/task-manage.git
```

2. Install dependencies:
```bash
cd task-manage
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser


## Project Structure

```
src/
├── components/          # React components
│   ├── TaskBoard.tsx   # Main task board component
│   ├── TaskCard.tsx    # Individual task component
│   ├── TaskForm.tsx    # Task creation/edit form
│   └── TaskFilters.tsx # Filtering interface
├── store/              # Redux store setup
│   ├── store.ts        # Store configuration
│   └── taskSlice.ts    # Task reducer and actions
├── types/              # TypeScript type definitions
└── App.tsx             # Root component
```





