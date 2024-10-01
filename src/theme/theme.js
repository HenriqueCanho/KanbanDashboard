// Define um objeto tema que contém uma paleta de cores e uma função para obter cores.
const theme = {
    colors: {
        // Define cores com suas representações RGB e RGBA.
        background: { rgb: 'rgb(245, 245, 245)', rgba: 'rgba(245, 245, 245, 1)' }, // Cor de fundo
        black: { rgb: 'rgb(0, 0, 0)', rgba: 'rgba(0, 0, 0, 1)' }, // Cor preta
        green: { rgb: 'rgb(128, 211, 1)', rgba: 'rgba(128, 211, 1, 1)' }, // Cor verde
        lightGreen: { rgb: 'rgb(163, 190, 113)', rgba: 'rgba(163, 190, 113, 1)' }, // Cor verde claro
        yellow: { rgb: 'rgb(255, 255, 0)', rgba: 'rgba(255, 255, 0, 1)' }, // Cor amarela
        olive: { rgb: 'rgb(143, 187, 70)', rgba: 'rgba(143, 187, 70, 1)' } // Cor oliva
    },

    // Função para obter a cor com um possível valor alpha.
    getColor: (colorName, alpha) => {
        const color = theme.colors[colorName]; // Busca a cor pelo nome.
        
        // Se um valor alpha for fornecido, retorna a cor em formato RGBA.
        if (alpha !== undefined) {
            // Extrai os componentes RGB da string RGB e os converte em números.
            const [r, g, b] = color.rgb.match(/\d+/g).map(Number);
            // Retorna a cor no formato RGBA, aplicando o valor alpha.
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        
        // Se não houver valor alpha, retorna a cor em formato RGB.
        return color.rgb;
    }
};

export default theme; // Exporta o objeto tema para ser utilizado em outros módulos.