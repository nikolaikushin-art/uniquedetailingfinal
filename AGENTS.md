<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Cursor Cloud specific instructions

- This is a single frontend product: a **TanStack Start** (React 19 + Vite 8) SSR marketing site (UNIQUE Detailing). There is no backend, database, auth, or env vars; the contact form on `/kontakty` is client-side only.
- Package manager is **Bun** (`bun.lock`). Dependencies are installed by the startup update script; you do not need to reinstall.
- Dev server: `bun run dev` (script in `package.json`). It serves on port **8080** (host/port are auto-configured by `@lovable.dev/vite-tanstack-config` for the sandbox), not Vite's default 5173.
- Standard commands live in `package.json` scripts: `dev`, `build`, `preview`, `lint` (`eslint .`), `format` (`prettier --write .`).
- `bun run lint` currently reports many pre-existing `prettier/prettier` formatting errors in `src/`; this is the repo's baseline state, not an environment problem. Run `bun run format` to auto-fix only if the task intends to reformat.
