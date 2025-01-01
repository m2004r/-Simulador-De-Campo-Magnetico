# Simulador de Campo Magnético - README

## Visão Geral do Projeto

O **Simulador de Campo Magnético** é uma experiência interativa criada para explorar conceitos fundamentais do magnetismo aplicados em um ambiente virtual. Este simulador recria os fenômenos de atração e interação entre campos magnéticos de diferentes objetos, permitindo a visualização do comportamento de esferas magnéticas em um campo central dominante.

## Como Funcionam os Ímãs

Os ímãs são materiais que geram campos magnéticos devido ao alinhamento de seus átomos. Cada átomo possui partículas chamadas elétrons, que orbitam o núcleo e possuem uma propriedade chamada **spin**, que pode ser entendida como um tipo de rotação intrínseca. Quando muitos spins estão alinhados em uma direção específica, o material torna-se magnético.

### Componentes Básicos

1. **Elétrons**:
   - São partículas subatômicas carregadas negativamente que orbitam o núcleo.
   - O movimento de carga cria um pequeno campo magnético chamado de **momento magnético**.

2. **Domínios Magnéticos**:
   - Pequenas regiões dentro do material onde os spins dos elétrons estão alinhados.
   - Em materiais magnéticos, esses domínios podem se alinhar em grande escala, criando um ímã visível.

3. **Campo Magnético**:
   - É a região ao redor de um ímã onde forças magnéticas podem ser sentidas.
   - A intensidade do campo é representada matematicamente pelo vetor campo magnético (\\\vec{B}). 

### Fórmulas Relacionadas

1. **Momento Magnético**:
   \\[ m = I \cdot A \\
   Onde:
   - \\ I \\: Corrente elétrica.
   - \\ A \\: Área da espira que gera o momento.

2. **Lei de Biot-Savart**:
   \\[ \vec{B} = \frac{\mu_0}{4\pi} \cdot \frac{I \cdot \vec{dl} \times \vec{r}}{r^3} \\
   Descreve o campo magnético gerado por uma corrente elétrica em um ponto específico.

3. **Força Magnética**:
   \\[ \vec{F} = q \cdot (\vec{v} \times \vec{B}) \\
   Onde:
   - \\ q \\: Carga elétrica.
   - \\ \vec{v} \\: Velocidade da carga.
   - \\ \vec{B} \\: Campo magnético.

## Objetivo

O projeto tem como objetivo ilustrar como campos magnéticos interagem entre si, utilizando física e matemática para simular de forma realista os seguintes fenômenos:

- Atração de objetos por campos magnéticos.
- Fusão de campos magnéticos menores para formar campos maiores.
- Limitação de crescimento do campo magnético central através de saturação.
- Modificação de velocidade e comportamento baseado na massa e força magnética.

## Funcionamento

### Elementos Fundamentais

1. **Esfera Central**:
   - É a principal fonte do campo magnético.
   - Começa com um tamanho moderado e atrai outras esferas menores.
   - Seu crescimento é limitado para evitar que tome toda a tela (saturação).

2. **Esferas Menores**:
   - São geradas aleatoriamente na tela.
   - Possuem tamanhos e momentos magnéticos variáveis.
   - São atraídas pela esfera central ou fundem-se entre si para criar novas esferas maiores.

### Conceitos Físicos e Matemáticos

1. **Força Magnética**:
   A força entre duas esferas é calculada com a fórmula:

   \\[ F = \frac{k \cdot m_1 \cdot m_2}{d^2} \\

   Onde:
   - \\ F \\: Força magnética.
   - \\ k \\: Constante arbitrária.
   - \\ m_1, m_2 \\: Momentos magnéticos dos objetos.
   - \\ d \\: Distância entre os centros dos objetos.

2. **Saturação do Campo Magnético**:
   - O crescimento da esfera central é limitado por um raio máximo (\\ r_{\text{max}} \\).
   - O momento magnético também é limitado a um valor máximo (\\ m_{\text{max}} \\).

3. **Fusão de Esferas**:
   Quando um grupo de esferas menores se acumula em uma área pequena, elas podem fundir-se em uma nova esfera com:

   - Raio total calculado como a raiz quadrada da soma dos quadrados dos raios das esferas.
   - Momento magnético como a soma dos momentos magnéticos das esferas.

   \\[ r_{\text{total}} = \sqrt{\sum_{i=1}^{n} r_i^2} \\
   \\[ m_{\text{total}} = \sum_{i=1}^{n} m_i \\

4. **Resistência ao Movimento**:
   Objetos maiores têm acelerações menores devido à sua massa maior, simulando a resistência física.

### Desafios e Soluções

#### Problema 1: Crescimento Excessivo da Esfera Central
- **Descrição**: A esfera central crescia indefinidamente, ocupando toda a tela e encerrando a experiência.
- **Solução**: Implementei a lógica de saturação, limitando o tamanho e o momento magnético da esfera central.

#### Problema 2: Fusão de Esferas Pequenas
- **Descrição**: Esferas pequenas acumulavam-se sem interagir adequadamente.
- **Solução**: Criei um limiar de fusão baseado no número de esferas em uma área concentrada.

#### Problema 3: Esferas Estáticas (Sem Movimento)
- **Descrição**: Algumas esferas não eram afetadas pela força magnética.
- **Solução**: Garanti que todas as esferas fossem constantemente atualizadas com base em forças aplicadas a elas.

#### Problema 4: Velocidade de Crescimento e Movimento
- **Descrição**: O crescimento era rápido demais, e objetos maiores moviam-se com a mesma velocidade que os menores.
- **Solução**: Refiz ajustes a aceleração com base no tamanho da esfera e introduzimos resistência proporcional.

## Conclusão

Este simulador demonstra, de forma simplificada, como campos magnéticos interagem e evoluem em um sistema dinâmico. Ele ilustra princípios básicos de física e matemática aplicados ao magnetismo, oferecendo uma experiência visual e interativa para compreender conceitos como força de atração, fusão de campos e resistência ao movimento.

### Recursos Complementares

Para aprender mais sobre magnetismo, confira os seguintes links:
- [Introdução ao Magnetismo](https://pt.khanacademy.org/science/physics/magnetic-forces-and-magnetic-fields)
- [Explicação Detalhada sobre Campos Magnéticos](http://hyperphysics.phy-astr.gsu.edu/hbase/magnetic/magfie.html)
- [Leis do Magnetismo](https://pt.wikipedia.org/wiki/Magnetismo)