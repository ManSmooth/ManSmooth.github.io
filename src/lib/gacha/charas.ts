export interface Character {
	name: string;
	rarity: number;
	imgUrl: string;
}

export const roster: Record<string, Character> = {
	angelina: {
		name: 'Gilberta',
		rarity: 6,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.419e55.png'
	},
	lifeng: {
		name: 'Lifeng',
		rarity: 6,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.4f2d92.png'
	},
	yvonne: {
		name: 'Yvonne',
		rarity: 6,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.de815f.png'
	},
	ember: {
		name: 'Ember',
		rarity: 6,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.59e1c7.png'
	},
	surtr: {
		name: 'Laevatain',
		rarity: 6,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.3a3df5.png'
	},
	honse: {
		name: 'Arclight',
		rarity: 5,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.3d1246.png'
	},
	panda: {
		name: 'Da Pan',
		rarity: 5,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.48c105.png'
	},
	perlica: {
		name: 'Perlica',
		rarity: 5,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.1fb4d9.png'
	},
	avywenna: {
		name: 'Avywenna',
		rarity: 5,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.a3194b.png'
	},
	xaihi: {
		name: 'Xaihi',
		rarity: 4,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.1e2b00.png'
	},
	aurora: {
		name: 'Snowshine',
		rarity: 4,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.85fda3.png'
	},
	wulfgard: {
		name: 'Wulfgard',
		rarity: 4,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.5cbcb0.png'
	},
	chen: {
		name: 'Chen Qianyu',
		rarity: 4,
		imgUrl:
			'https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.2730c2.png'
	}
};
