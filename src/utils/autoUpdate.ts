const data = localStorage.getItem('LastScrs');
let lastScrs = data ? JSON.parse(data) : ""; //上一次获取的script地址

// const scriptReg = /\<script.*src=["'](?<src>[^"']+)/gm;

// 获取最新页面中的src连接

async function extractNewScripts() {
	const html = await fetch("/?_timestamp=" + Date.now()).then((res) => res.text());
	const dom = document.createElement('div');
	dom.innerHTML = html;
	// scriptReg.lastIndex = 0;
	const result = [''];
	[...dom.children].forEach(val => {
		if (val.tagName === 'SCRIPT' && (val as HTMLScriptElement).src) {
			result.push((val as HTMLScriptElement).src);
		}
	})

	return result;
}

async function needUpdate() {
	const newScripts = await extractNewScripts();
	if (!lastScrs) {
		lastScrs = newScripts;
		localStorage.setItem('LastScrs', JSON.stringify(lastScrs));
		return false;
	}
	let result = false;
	if (lastScrs.length !== newScripts.length) {
		result = true;
	}
	for (let i = 0; i < lastScrs.length; i++) {
		if (lastScrs[i] !== newScripts[i]) {
			result = true;
			break;
		}
	}
	lastScrs = newScripts;
	localStorage.setItem('LastScrs', JSON.stringify(lastScrs));
	return result;
}

// const DURATION = 2000;
async function autoRefresh() {
	const willUpdate = await needUpdate();
	if (willUpdate) {
		// const result = confirm("更新页面");
		// if (result) {
		location.reload();
		// }
	}
}

autoRefresh();