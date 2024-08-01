import {TreeNodeData} from "../components/tree/tree.tsx";

export const initialData: TreeNodeData[] = [
  {
    id: 1,
    name: "Lorem",
    children: [
      {
        id: 2,
        name: "Ipsum",
      },
      {
        id: 3,
        name: "Dolor",
      },
    ],
  },
  {
    id: 4,
    name: "Sit",
  },
  {
    id: 5,
    name: "Amet",
    children: [
      {
        id: 7,
        name: "Consectetur",
        children: [
          {
            id: 8,
            name: "Adipiscing",
          },
          {
            id: 9,
            name: "Elit",
          },
        ],
      },
      {
        id: 10,
        name: "Sed",
      },
    ],
  },
  {
    id: 6,
    name: "Do",
  },
];
