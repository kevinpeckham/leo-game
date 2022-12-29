export class Bullet {
	[key: string]: string | number | undefined;
	color: string;
	content: string;
	id: string;
	opacity: number;
	status: string;
	style: string;
	x: number;
	y: number;
	constructor(content?: string, id?: number, status?: string, x?: number, y?: number) {
		this.content = content ? content : '';
		this.color = 'transparent';
		this.id = id ? `b-${id.toString()}` : '';
		this.opacity = 1;
		this.status = status ? status : 'ready';
		this.style = '';
		this.x = x ? x : 0;
		this.y = y ? y : 0;
	}
}
