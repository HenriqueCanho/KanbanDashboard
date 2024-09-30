const theme = {
    colors: {
        background: { rgb: 'rgb(245, 245, 245)', rgba: 'rgba(245, 245, 245, 1)' },
        black: { rgb: 'rgb(0, 0, 0)', rgba: 'rgba(0, 0, 0, 1)' },
        green: { rgb: 'rgb(128, 211, 1)', rgba: 'rgba(128, 211, 1, 1)' },
        lightGreen: { rgb: 'rgb(163, 190, 113)', rgba: 'rgba(163, 190, 113, 1)' },
        yellow: { rgb: 'rgb(255, 255, 0)', rgba: 'rgba(255, 255, 0, 1)' },
        olive: { rgb: 'rgb(143, 187, 70)', rgba: 'rgba(143, 187, 70, 1)' }
    },

    getColor: (colorName, alpha) => {
        const color = theme.colors[colorName];
        if (alpha !== undefined) {
            const [r, g, b] = color.rgb.match(/\d+/g).map(Number);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        return color.rgb;
    }
};

export default theme;