declare module '*.png' {
  const content: any;
  export default content;
}

interface RenderItem<T> {
  item: T;
  index: number;
}
