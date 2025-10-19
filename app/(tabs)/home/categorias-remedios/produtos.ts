export type Produto = {
  id: string;
  title: string;
  categoria: 'Analgésicos' | 'Anti-inflamatórios' | 'Anti-alérgicos';
  preço: number;
  image: any;
};

export const produtos: Produto[] = [
  { id: '1', title: 'Paracetamol 750mg', categoria: 'Analgésicos', preço: 5.50, image: require('@/assets/images/icon.png') },
  { id: '2', title: 'Dipirona Sódica 500mg', categoria: 'Analgésicos', preço: 4.25, image: require('@/assets/images/icon.png') },
  { id: '3', title: 'Dorflex - 10 Comprimidos', categoria: 'Analgésicos', preço: 7.00, image: require('@/assets/images/icon.png') },
  { id: '4', title: 'Aspirina 500mg', categoria: 'Analgésicos', preço: 9.80, image: require('@/assets/images/icon.png') },
  { id: '5', title: 'Tylenol DC 500mg', categoria: 'Analgésicos', preço: 12.30, image: require('@/assets/images/icon.png') },
  { id: '6', title: 'Buscopan Composto', categoria: 'Analgésicos', preço: 15.00, image: require('@/assets/images/icon.png') },

  { id: '7', title: 'Ibuprofeno 400mg', categoria: 'Anti-inflamatórios', preço: 8.90, image: require('@/assets/images/icon.png') },
  { id: '8', title: 'Nimesulida 100mg', categoria: 'Anti-inflamatórios', preço: 11.50, image: require('@/assets/images/icon.png') },
  { id: '9', title: 'Diclofenaco Sódico 50mg', categoria: 'Anti-inflamatórios', preço: 6.75, image: require('@/assets/images/icon.png') },
  { id: '10', title: 'Cetoprofeno 100mg', categoria: 'Anti-inflamatórios', preço: 18.00, image: require('@/assets/images/icon.png') },
  { id: '11', title: 'Meloxicam 15mg', categoria: 'Anti-inflamatórios', preço: 22.40, image: require('@/assets/images/icon.png') },
  { id: '12', title: 'Alginac 1000', categoria: 'Anti-inflamatórios', preço: 25.90, image: require('@/assets/images/icon.png') },

  { id: '13', title: 'Loratadina 10mg', categoria: 'Anti-alérgicos', preço: 12.00, image: require('@/assets/images/icon.png') },
  { id: '14', title: 'Allegra 120mg', categoria: 'Anti-alérgicos', preço: 28.50, image: require('@/assets/images/icon.png') },
  { id: '15', title: 'Hixizine 25mg', categoria: 'Anti-alérgicos', preço: 19.90, image: require('@/assets/images/icon.png') },
  { id: '16', title: 'Desloratadina 5mg', categoria: 'Anti-alérgicos', preço: 14.75, image: require('@/assets/images/icon.png') },
  { id: '17', title: 'Polaramine 2mg', categoria: 'Anti-alérgicos', preço: 16.20, image: require('@/assets/images/icon.png') },
  { id: '18', title: 'Zyrtec 10mg', categoria: 'Anti-alérgicos', preço: 31.00, image: require('@/assets/images/icon.png') },
];