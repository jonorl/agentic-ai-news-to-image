import express from 'express';

// n8n writes each generated image into this folder, which the VPS mounts into both containers.
export const IMAGES_DIR = process.env.IMAGES_DIR ?? '/app/images';

// Every image is named after the n8n execution that made it, so a name never points to different content and
// browsers and Cloudflare can keep it for a year.
export const imagesRouter = (dir = IMAGES_DIR) =>
  express.static(dir, { immutable: true, maxAge: '365d', index: false, dotfiles: 'ignore', redirect: false });
