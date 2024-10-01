const theme = {
    colors: {
        background: { rgb: 'rgb(245, 245, 245)', rgba: 'rgba(245, 245, 245, 1)' },
        black: { rgb: 'rgb(0, 0, 0)', rgba: 'rgba(0, 0, 0, 1)' },
        green: { rgb: 'rgb(128, 211, 1)', rgba: 'rgba(128, 211, 1, 1)' },
        lightGreen: { rgb: 'rgb(163, 190, 113)', rgba: 'rgba(163, 190, 113, 1)' },
        yellow: { rgb: 'rgb(255, 255, 0)', rgba: 'rgba(255, 255, 0, 1)' },
        olive: { rgb: 'rgb(143, 187, 70)', rgba: 'rgba(143, 187, 70, 1)' }
    },
    // Define um objeto de tema que contém cores em formatos RGB e RGBA.

    getColor: (colorName, alpha) => {
        const color = theme.colors[colorName];
        // Acessa a cor correspondente ao nome fornecido.

        if (alpha !== undefined) {
            const [r, g, b] = color.rgb.match(/\d+/g).map(Number);
            // Extrai os valores RGB da string e converte para números.

            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            // Retorna a cor no formato RGBA, usando o valor alpha fornecido.
        }

        return color.rgb;
        // Retorna a cor no formato RGB, se o alpha não for fornecido.
    }
};

export default theme;
// Exporta o objeto theme para ser usado em outros módulos.