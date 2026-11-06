const projects = {
  mnemosine: {
    title: 'Mnemosine', status: 'Em estruturação',
    description: 'Um organizador de memórias com IA, pensado como uma jornada de autoconhecimento.',
    context: 'A ideia é ajudar a registrar memórias e acontecimentos, criar conexões entre eles e oferecer espaço para reflexão sobre vida pessoal, carreira, família e questões paradoxais. A interface está em estruturação para reunir essas experiências de forma coerente e tranquila.',
    focus: ['Registro e organização de acontecimentos e memórias em listagens e grafos.', 'RAG para recuperar memórias relevantes e contextualizar as conversas.', 'Conexões entre acontecimentos e exploração de padrões pessoais, incluindo tipologias psicológicas como recurso de reflexão.', 'Experiência integrada de chat, journal e timeline em definição.', 'Arquitetura em estudo com AgentCore, FastAPI, PostgreSQL e serviços AWS.'],
    architecture: 'Registrar → Conectar → Recuperar contexto com RAG → Refletir',
    note: 'Visão de produto e arquitetura em estudo. As capacidades e tecnologias descritas representam a direção planejada, não funcionalidades já entregues.'
  },
  crm: {
    title: 'Crm para a Mirai Autos', status: 'Em estruturação',
    description: 'Um CRM integrado a um gerador de orçamentos com inteligência artificial para a oficina do meu pai.',
    context: 'A Mirai Autos é um negócio da minha família. O projeto parte desse contexto próximo para desenhar uma solução ligada à rotina da oficina e ao relacionamento com seus clientes.',
    focus: ['Estruturar o CRM para o contexto da Mirai Autos.', 'Integrar a gestão de relacionamento à geração de orçamentos com IA.', 'Evoluir a solução a partir das necessidades reais da oficina.'],
    architecture: 'Relacionamento com o cliente → CRM → Geração de orçamento com IA',
    link: 'https://github.com/zxkazuki/mirai-autos', linkLabel: 'Ver a base de orçamentos no GitHub',
    note: 'A integração com CRM e IA está em estruturação. O repositório relacionado contém uma base web para orçamentos; não representa o CRM completo.'
  },
  site: {
    title: 'Site Mirai Autos', status: 'Em estruturação',
    description: 'Um projeto de presença digital para a oficina do meu pai.',
    context: 'Além do sistema de gestão, estou estruturando um site para a Mirai Autos. É uma oportunidade de aplicar tecnologia em um negócio cuja história conheço de perto.',
    focus: ['Definir a apresentação digital da oficina.', 'Organizar conteúdo e identidade para o site.', 'Construir a experiência a partir do contexto do negócio familiar.'],
    note: 'Site em estruturação. Conteúdo, funcionalidades e publicação ainda fazem parte da evolução do projeto.'
  },
  copilot: {
    title: 'Copiloto de documentos', status: 'Código disponível',
    description: 'Uma plataforma de processamento inteligente de documentos que transforma PDFs, imagens e documentos escaneados em dados estruturados e insights.',
    context: 'O projeto explora um pipeline de classificação, extração de campos e geração de insights com Amazon Bedrock, incluindo uma etapa de revisão humana.',
    focus: ['Frontend em Streamlit e processamento em Python.', 'Amazon Bedrock para classificação, extração e insights.', 'Amazon S3 para documentos e DynamoDB para registros.', 'Infraestrutura de demonstração com EC2 e CloudFormation.'],
    architecture: 'Upload → Classificação com IA → Extração estruturada → Insights → Revisão humana',
    link: 'https://github.com/zxkazuki/Doc_intel_copilot', linkLabel: 'Explorar o código no GitHub',
    note: 'Descrição baseada na documentação do repositório. A disponibilidade do código não implica uma aplicação em produção.'
  }
};
const dialog = document.querySelector('#project-dialog');
const content = document.querySelector('#dialog-content');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  content.replaceChildren();
  const add = (tag, value, className) => { const node = document.createElement(tag); node.textContent = value; if (className) node.className = className; content.append(node); return node; };
  add('span', project.status, project.link && project.title === 'Copiloto de documentos' ? 'status code' : 'status');
  const heading = add('h2', '');
  heading.id = 'dialog-title';
  const firstWord = project.title.match(/^\S+/)[0];
  const titleWord = document.createElement('span');
  titleWord.className = 'title-word';
  const initial = document.createElement('b');
  initial.textContent = firstWord[0];
  titleWord.append(initial, document.createTextNode(firstWord.slice(1)));
  heading.append(titleWord, document.createTextNode(project.title.slice(firstWord.length)));
  add('p', project.description, 'description');
  add('h3', 'O contexto'); add('p', project.context);
  add('h3', 'Foco do projeto');
  const list = document.createElement('ul');
  project.focus.forEach(text => { const item = document.createElement('li'); item.textContent = text; list.append(item); }); content.append(list);
  if (project.architecture) { add('h3', 'Visão do fluxo'); add('p', project.architecture, 'architecture'); }
  if (project.link) { const a = add('a', project.linkLabel + ' ↗', 'button dark'); a.href = project.link; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  add('p', project.note, 'dialog-note');
  dialog.showModal();
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const r = dialog.getBoundingClientRect(); if(event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close(); });
