export type Produto = {
  id: string;
  title: string;
  categoria: 'analgesicos' | 'antinflamatorios' | 'antialergicos';
  preço: number;
  image: any;
};

export const produtos: Produto[] = [
  { id: '1', title: 'Paracetamol', categoria: 'analgesicos', preço: 5.5, image: require('@/assets/images/icon.png') },
  { id: '2', title: 'Ibuprofeno', categoria: 'antinflamatorios', preço: 8.9, image: require('@/assets/images/icon.png') },
  { id: '3', title: 'Loratadina', categoria: 'antialergicos', preço: 12.0, image: require('@/assets/images/icon.png') },
];