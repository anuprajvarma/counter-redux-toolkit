## 1 Initialize the Next.js 15 Project

Run the following command to create a Next.js project with TypeScript:

```sh
npx create-next-app@latest counter-app --ts
cd counter-app
```

## 2 Install Redux Toolkit & React-Redux

Install the required dependencies:

```sh
npm install @reduxjs/toolkit react-redux
```

## 3 Setup Redux in Next.js 15

### 📌 3.1 Create a Redux Store

Create a new folder: `store/` and inside it, create `store.ts`

#### `store/store.ts`

```tsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // Import reducer

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Register reducer
  },
});

// Define TypeScript types for RootState and Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 📌 3.2 Create a Counter Slice (Reducer + Actions in One File)

Create a new file `store/counterSlice.ts`

#### `store/counterSlice.ts`

```tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define initial state type
interface CounterState {
  count: number;
}

// Initial state
const initialState: CounterState = {
  count: 0,
};

// Create Redux slice
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

// Export actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
```

### 📌 3.3 Provide Redux Store to Next.js App

Since Next.js 15 uses Server Components by default, we need to wrap our application with Redux Provider.

#### `store/provider.tsx` (New File)

```tsx
"use client"; // Needed because Redux Provider is a client component

import { Provider } from "react-redux";
import { store } from "./store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

### 📌 3.4 Wrap Next.js App with Redux Provider

Now, import `ReduxProvider` into `app/layout.tsx`.

#### `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { ReduxProvider } from "../store/provider"; // Import Redux Provider
import "./globals.css"; // Default styles

export const metadata: Metadata = {
  title: "Counter App",
  description: "A simple counter app using Redux Toolkit and Next.js 15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
```

## 4⃣ Create Counter Component

Now, create the actual Counter UI and connect it to Redux.

#### `app/page.tsx`

```tsx
"use client"; // Required for event handling & Redux hooks

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { increment, decrement, incrementByAmount } from "../store/counterSlice";
import { useState } from "react";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch<AppDispatch>();
  const [incrementValue, setIncrementValue] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-100">
      <h1 className="text-3xl font-bold">Counter App</h1>
      <p className="text-xl">Count: {count}</p>
      <div className="space-x-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrement
        </button>
      </div>
      <div className="space-x-4 mt-4">
        <input
          type="number"
          value={incrementValue}
          onChange={(e) => setIncrementValue(Number(e.target.value))}
          className="px-2 py-1 border border-gray-400 rounded"
        />
        <button
          onClick={() => dispatch(incrementByAmount(incrementValue))}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Increment by {incrementValue}
        </button>
      </div>
    </div>
  );
}
```
