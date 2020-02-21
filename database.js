const utils = require('./utils.js');

let guilds = {};

const load = async (path) => {
	console.log('Загрузка базы данных...');
	let data;
	if (await utils.existsAsync(path)) {
		data = JSON.parse(await utils.readFileAsync(path));
	}
	// если файла database.js не существует, то юзаем стандартные данные
	else {
		data = { guilds: {} }
	}
	guilds = data.guilds;
	console.log('База данных успешно загрузилась!...');
}

const save = async (path) => {
	console.log('Сохранение базы данных...');
	let data = {
		guilds: guilds
	}
	await utils.writeFileAsync(path, JSON.stringify(data, null, 4));
	console.log('База данных успешно сохранена!');
}

const getGuildData = (guild) => {
	if (!guilds[guild.id]) {
		guilds[guild.id] = {
			prefix: 'e!',
			accounts: {}
		}
	}
	return guilds[guild.id];
}

const getAccount = (member) => {
	let g = getGuildData(member.guild);
	if (!g.accounts[member.id]) {
		g.accounts[member.id] = {
			xp: 0,
			lvl: 1,
			warns: 0,
			reports: 0
		}
	}
	return g.accounts[member.id];
}

module.exports = {
	load: load,
	save: save,
	getGuildData: getGuildData,
	getAccount: getAccount
}