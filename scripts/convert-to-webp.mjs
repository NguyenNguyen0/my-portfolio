// One-off migration: converts every PNG/JPG under public/ to .webp and
// deletes the original. PNGs with real transparency (any pixel with
// alpha < 255) are skipped and left as-is — webp would keep the alpha
// channel too, but skipping avoids silently re-encoding art that was
// deliberately authored as PNG for transparency. GIFs are left untouched
// (webp animation support is inconsistent and next/image doesn't optimize
// gifs specially anyway). Re-run manually if new PNG/JPG assets are added.
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	'../public',
);

async function findImages(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await findImages(full)));
		} else if (/\.(png|jpe?g)$/i.test(entry.name)) {
			files.push(full);
		}
	}
	return files;
}

async function hasRealTransparency(file) {
	const meta = await sharp(file).metadata();
	if (!meta.hasAlpha) return false;
	const stats = await sharp(file).stats();
	const alpha = stats.channels[stats.channels.length - 1];
	return alpha.min < 255;
}

const images = await findImages(PUBLIC_DIR);
let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
const skipped = [];

for (const file of images) {
	if (await hasRealTransparency(file)) {
		skipped.push(path.relative(PUBLIC_DIR, file));
		continue;
	}

	const before = (await stat(file)).size;
	const dest = file.replace(/\.(png|jpe?g)$/i, '.webp');
	await sharp(file).webp({ quality: 82 }).toFile(dest);
	const after = (await stat(dest)).size;
	await unlink(file);

	totalBefore += before;
	totalAfter += after;
	converted += 1;
	console.log(
		`${path.relative(PUBLIC_DIR, file)} -> ${path.relative(PUBLIC_DIR, dest)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
	);
}

if (skipped.length) {
	console.log(
		`\nSkipped (real transparency detected, kept as-is): ${skipped.join(', ')}`,
	);
}
console.log(
	`\n${converted} images converted. Total ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`,
);
