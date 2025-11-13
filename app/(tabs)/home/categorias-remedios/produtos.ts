export type Produto = {
  id: string;
  title: string;
  chave: string[];
  categoria: 'Analgésicos' | 'Anti-inflamatórios' | 'Anti-alérgicos';
  image: any;
};

export const produtos: Produto[] = [

  { 
    id: '1', 
    title: 'Paracetamol 750mg', 
    categoria: 'Analgésicos', 
    chave: ['dor de cabeça', 'febre', 'gripe', 'resfriado', 'enxaqueca', 'dor muscular', 'cólica menstrual', 'dor de dente', 'dor de garganta'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '2', 
    title: 'Dipirona Sódica 500mg', 
    categoria: 'Analgésicos', 
    chave: ['dor', 'febre', 'dor de cabeça', 'cólica', 'enxaqueca'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '3', 
    title: 'Dorflex - 10 Comprimidos', 
    categoria: 'Analgésicos', 
    chave: ['dor de cabeça', 'dor muscular', 'contratura', 'relaxante muscular', 'dor nas costas', 'torcicolo'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '4', 
    title: 'Aspirina 500mg', 
    categoria: 'Analgésicos', 
    chave: ['dor de cabeça', 'febre', 'gripe', 'resfriado', 'dor de dente', 'dor de garganta', 'dor muscular', 'artrite'], 
    image: require('@/assets/images/Cure+.png') 
  },

  /*https://www.tylenol.com.br/produtos/adulto/tylenol-dc-multiplas-dores-dupla-acao-contra-a-dor-1-g*/
  { 
    id: '5', 
    title: 'Tylenol DC 500mg', 
    categoria: 'Analgésicos', 
    chave: ['dor de cabeça forte', 'dor de dente', 'dores', 'febre', 'gripes', 'resfriados', 'cólicas menstruais'], 
    image: require('@/assets/images/Cure+.png') 
  },

  { 
    id: '6', 
    title: 'Buscopan Composto', 
    categoria: 'Analgésicos', 
    chave: ['cólica abdominal', 'dor na barriga', 'desconforto', 'cólicas menstruais', 'espasmos'], 
    image: require('@/assets/images/Cure+.png') 
  },

  { 
    id: '7', 
    title: 'Ibuprofeno 400mg', 
    categoria: 'Anti-inflamatórios', 
    chave: ['dor de cabeça', 'febre', 'gripe', 'resfriado', 'cólica menstrual', 'dor de dente', 'dor muscular', 'inflamação'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '8', 
    title: 'Nimesulida 100mg', 
    categoria: 'Anti-inflamatórios', 
    chave: ['inflamação', 'dor de garganta', 'tendinite', 'torções', 'contusões', 'artrite', 'dor de dente'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '9', 
    title: 'Diclofenaco Sódico 50mg', 
    categoria: 'Anti-inflamatórios', 
    chave: ['dor reumática', 'artrite', 'dor nas costas', 'gota', 'entorse', 'pós-cirúrgico', 'inflamação'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '10', 
    title: 'Cetoprofeno 100mg', 
    categoria: 'Anti-inflamatórios', 
    chave: ['inflamação', 'dores reumáticas', 'traumatismos', 'pós-operatório', 'artrite'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '11', 
    title: 'Meloxicam 15mg', 
    categoria: 'Anti-inflamatórios', 
    chave: ['artrite reumatoide', 'osteoartrite', 'dor nas articulações', 'inflamação'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '12', 
    title: 'Alginac 1000', 
    categoria: 'Anti-inflamatórios', 
    chave: ['dor nas costas', 'lombalgia', 'dor no pescoço', 'cervicalgia', 'dor nos nervos', 'ciático'], 
    image: require('@/assets/images/Cure+.png') 
  },

  { 
    id: '13', 
    title: 'Loratadina 10mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['rinite alérgica', 'coriza', 'espirros', 'coceira no nariz', 'urticária', 'alergia de pele'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '14', 
    title: 'Allegra 120mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['rinite alérgica', 'espirros', 'coriza', 'coceira nos olhos', 'olhos lacrimejantes', 'sem sono'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '15', 
    title: 'Hixizine 25mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['coceira', 'prurido', 'urticária', 'alergia de pele', 'dermatite atópica'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '16', 
    title: 'Desloratadina 5mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['rinite alérgica', 'coriza', 'espirros', 'coceira no nariz', 'tosse alérgica', 'coceira no céu da boca'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '17', 
    title: 'Polaramine 2mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['alergia', 'coceira', 'rinite alérgica', 'urticária', 'picada de inseto', 'conjuntivite alérgica'], 
    image: require('@/assets/images/Cure+.png') 
  },
  { 
    id: '18', 
    title: 'Zyrtec 10mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['rinite alérgica', 'urticária', 'coceira', 'sintomas nasais', 'sintomas oculares'], 
    image: require('@/assets/images/Cure+.png') 
  },
];