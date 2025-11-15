export type Produto = {
  id: string;
  title: string;
  chave: string[];
  categoria: 'Analgésicos' | 'Anti-inflamatórios' | 'Anti-alérgicos';
  image: any;
  descricao: string;
  bula: string;
};

export const produtos: Produto[] = [

  { 
    id: '1', 
    title: 'Paracetamol 750mg', 
    categoria: 'Analgésicos', 
    chave: ['dor de cabeça', 'febre', 'gripe', 'resfriado', 'enxaqueca', 'dor muscular', 'cólica menstrual', 'dor de dente', 'dor de garganta'], 
    image: require('@/assets/remedios/Paracetamol.png'),
    descricao: 'Analgésico e antipirético para dores leves a moderadas (cefaleia, dores musculares, cólicas, odontalgia) e febre em quadros virais comuns. Evitar excesso ou uso combinado com álcool devido risco hepático. Fonte: bula / ANVISA.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/Paracetamol750mgEMS.pdf'
  },
  { 
    id: '2', 
    title: 'Dipirona Sódica 500mg', 
    categoria: 'Analgésicos', 
    chave: ['dor', 'febre', 'dor de cabeça', 'cólica', 'enxaqueca'], 
    image: require('@/assets/remedios/Dipirona Sódica.png'),
    descricao: 'Analgésico, antipirético e com leve ação espasmolítica para dores moderadas, cefaleias, cólicas e estados febris. Risco raro de agranulocitose descrito em farmacovigilância; usar conforme bula. Fonte: ANVISA.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/Dipirona500mgGotasNeoQuimica.pdf'
  },
  { 
    id: '3', 
    title: 'Dorflex', 
    categoria: 'Analgésicos', 
    chave: ['dor de cabeça', 'dor muscular', 'contratura', 'relaxante muscular', 'dor nas costas', 'torcicolo'], 
    image: require('@/assets/remedios/Dorflex.png'),
    descricao: 'Combinação de dipirona, citrato de orfenadrina (relaxante muscular) e cafeína para dores musculares, contraturas, tensão cervical e cefaleia tensional. Composição oficial conforme bula Dorflex. Fonte: Sanofi.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/Dorflexsanofi.pdf'
  },
  { 
    id: '4', 
    title: 'Aspirina 500mg', 
    categoria: 'Analgésicos', 
    chave: ['dor de cabeça', 'febre', 'gripe', 'resfriado', 'dor de dente', 'dor de garganta', 'dor muscular', 'artrite'], 
    image: require('@/assets/remedios/Aspirina.png'),
    descricao: 'Ácido acetilsalicílico: analgésico, antipirético e anti-inflamatório para dores leves a moderadas e estados febris. Também possui ação antiplaquetária em outros contextos clínicos (não automedicar essa indicação). Fonte: bula Bayer / ANVISA.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/Aspirina.pdf'
  },
  { 
    id: '5', 
    title: 'Tylenol DC 500mg', 
    categoria: 'Analgésicos', 
    chave: ['dor de cabeça forte', 'dor de dente', 'dores', 'febre', 'gripes', 'resfriados', 'cólicas menstruais'], 
    image: require('@/assets/remedios/Tylenol.png'),
    descricao: 'Paracetamol associado à cafeína para potencializar alívio de dores (cefaleia, odontalgia, musculares, cólicas) e redução de febre em viroses comuns. Fonte: bula Tylenol DC (J&J).',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/tylenol-dc-multiplasdores-bula.pdf'
  },
  { 
    id: '6', 
    title: 'Buscopan Composto', 
    categoria: 'Analgésicos', 
    chave: ['cólica abdominal', 'dor na barriga', 'desconforto', 'cólicas menstruais', 'espasmos'], 
    image: require('@/assets/remedios/Buscopan.png'),
    descricao: 'Dipirona + butilbrometo de escopolamina: alívio de cólicas abdominais, menstruais e espasmos gastrointestinais. Fonte: bula Buscopan Composto (Sanofi) / ANVISA.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/Buscopan-Composto-Brometo-de-N-Butil-Escopolamina-10mg--Dipirona-Sodica-250mg---20-comprimidos.pdf'
  },
  { 
    id: '7', 
    title: 'Ibuprofeno 400mg', 
    categoria: 'Anti-inflamatórios', 
    chave: ['dor de cabeça', 'febre', 'gripe', 'resfriado', 'cólica menstrual', 'dor de dente', 'dor muscular', 'inflamação'], 
    image: require('@/assets/remedios/Ibuprofeno.png'),
    descricao: 'AINE (anti-inflamatório não esteroide) para dor leve a moderada, febre e processos inflamatórios em tecidos moles e articulações. Fonte: bula / OMS orientações gerais sobre AINEs.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/bula-ibuprofeno-400mg-medley-capsulas.pdf'
  },
  { 
    id: '8', 
    title: 'Nimesulida 100mg', 
    categoria: 'Anti-inflamatórios', 
    chave: ['inflamação', 'dor de garganta', 'tendinite', 'torções', 'contusões', 'artrite', 'dor de dente'], 
    image: require('@/assets/remedios/Nimesulida.png'),
    descricao: 'AINE com ação anti-inflamatória e analgésica usado em dores inflamatórias agudas (tendinites, contusões, artralgia). Deve-se observar risco hepático em uso prolongado conforme alertas regulatórios. Fonte: bula / ANVISA.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/NimesulidaEurofarma.pdf'
  },
  { 
    id: '9', 
    title: 'Diclofenaco Sódico 50mg', 
    categoria: 'Anti-inflamatórios', 
    chave: ['dor reumática', 'artrite', 'dor nas costas', 'gota', 'entorse', 'pós-cirúrgico', 'inflamação'], 
    image: require('@/assets/remedios/Diclofenaco.png'),
    descricao: 'AINE (anti-inflamatório não esteroide) indicado para dor e inflamação em condições reumáticas, pós-trauma, entorses e crises de gota. Fonte: bula / diretrizes clínicas reumatológicas.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/DiclofenacoSodico50mgEMS.pdf'
  },
  { 
    id: '10', 
    title: 'Cetoprofeno 100mg', 
    categoria: 'Anti-inflamatórios', 
    chave: ['inflamação', 'dores reumáticas', 'traumatismos', 'pós-operatório', 'artrite'], 
    image: require('@/assets/remedios/Cetoprofeno.png'),
    descricao: 'AINE (anti-inflamatório não esteroide) usado para dor e inflamação em afecções músculo-esqueléticas, pós-operatório e artrites. Fonte: bula oficial / ANVISA.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/CetoprofenoBiosintetica.PDF'
  },
  { 
    id: '11', 
    title: 'Meloxicam 15mg', 
    categoria: 'Anti-inflamatórios', 
    chave: ['artrite reumatoide', 'osteoartrite', 'dor nas articulações', 'inflamação'], 
    image: require('@/assets/remedios/Meloxicam.png'),
    descricao: 'AINE (anti-inflamatório não esteroide) com seletividade relativa para COX-2, indicado para controle de dor e inflamação em artrite reumatoide e osteoartrite. Fonte: bula / guidelines reumatologia.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/MeloxicamInjetavelEurofarma.pdf'
  },
  { 
    id: '12', 
    title: 'Alginac 1000', 
    categoria: 'Anti-inflamatórios', 
    chave: ['dor nas costas', 'lombalgia', 'dor no pescoço', 'cervicalgia', 'dor nos nervos', 'ciático'], 
    image: require('@/assets/remedios/Alginac.png'),
    descricao: 'Diclofenaco sódico associado às vitaminas B1 (tiamina), B6 (piridoxina) e B12 (cianocobalamina) para dor inflamatória e/ou neuropática (lombalgia, cervicalgia, ciatalgia). Composição conforme bula Alginac 1000.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/Alginac.pdf'
  },
  { 
    id: '13', 
    title: 'Loratadina 10mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['rinite alérgica', 'coriza', 'espirros', 'coceira no nariz', 'urticária', 'alergia de pele'], 
    image: require('@/assets/remedios/Loratadina.png'),
    descricao: 'Antihistamínico de segunda geração para alívio de sintomas de rinite alérgica (espirros, coriza, prurido) e urticária. Baixa sedação. Fonte: bula / diretrizes de alergologia.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/Loratadina-10mg-Cimed.pdf'
  },
  { 
    id: '14', 
    title: 'Allegra 120mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['rinite alérgica', 'espirros', 'coriza', 'coceira nos olhos', 'olhos lacrimejantes', 'sem sono'], 
    image: require('@/assets/remedios/Allegra.png'),
    descricao: 'Fexofenadina: antihistamínico não sedativo para rinite alérgica e urticária idiopática, reduz espirros, coriza e prurido ocular. Fonte: bula / ANVISA.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/Allegra.pdf'
  },
  { 
    id: '15', 
    title: 'Hixizine 25mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['coceira', 'prurido', 'urticária', 'alergia de pele', 'dermatite atópica'], 
    image: require('@/assets/remedios/Hixizine.png'),
    descricao: 'Hidroxizina: antihistamínico com efeito sedativo útil em pruridos intensos, urticária e algumas dermatites. Pode causar sonolência; evitar operar máquinas. Fonte: bula / orientações dermatológicas.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/Hixizine-Theraskin.pdf'
  },
  { 
    id: '16', 
    title: 'Desloratadina 5mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['rinite alérgica', 'coriza', 'espirros', 'coceira no nariz', 'tosse alérgica', 'coceira no céu da boca'], 
    image: require('@/assets/remedios/Desloratadina.png'),
    descricao: 'Metabólito ativo da loratadina: antihistamínico para rinite alérgica sazonal ou perene e urticária crônica. Perfil não sedativo na maioria dos pacientes. Fonte: bula / diretrizes alergologia.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/DesloratadinaSandoz.pdf'
  },
  { 
    id: '17', 
    title: 'Polaramine 2mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['alergia', 'coceira', 'rinite alérgica', 'urticária', 'picada de inseto', 'conjuntivite alérgica'], 
    image: require('@/assets/remedios/Polaramine.png'),
    descricao: 'Dexclorfeniramina: antihistamínico de primeira geração para manifestações alérgicas cutâneas e respiratórias; pode causar sonolência. Fonte: bula / ANVISA.',
    bula: 'https://img.drogasil.com.br/raiadrogasil_bula/Polaramine-Hypera.pdf'
  },
  { 
    id: '18', 
    title: 'Zyrtec 10mg', 
    categoria: 'Anti-alérgicos', 
    chave: ['rinite alérgica', 'urticária', 'coceira', 'sintomas nasais', 'sintomas oculares'], 
    image: require('@/assets/remedios/Zytrec.png'),
    descricao: 'Cetirizina: antihistamínico para sintomas de rinite alérgica e urticária crônica, reduz prurido e secreção nasal. Sedação leve em alguns casos. Fonte: bula / consensos alergologia.',
    bula: 'https://product-data.raiadrogasil.io/documents/3831308.pdf'
  },
];