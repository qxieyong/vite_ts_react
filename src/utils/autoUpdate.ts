const autoUpdate = () => {
    fetch('/')
        .then(response => response.text())
        .then(data => {
            const dom = new DOMParser().parseFromString(data, 'text/html');
            const scripts = dom.querySelectorAll('script[type="module"]') as unknown as HTMLScriptElement[];
            console.log(scripts, 'bbb')
            scripts.forEach(script => {
                console.log(script, '标签');
                if (script.src.includes(window.location.origin)) {
                    const currentVersion = window.localStorage.getItem('version');
                    if (currentVersion !== script.src) {
                        console.log('版本不一样', currentVersion, script.src);
                        window.localStorage.setItem('version', script.src);
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

export default autoUpdate;
