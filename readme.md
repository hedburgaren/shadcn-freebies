# shadcn-freebies

An index of free extensions for [shadcn/ui](https://ui.shadcn.com): blocks, components, dashboards, templates, themes and tooling.

Everything listed here is free to use, at least in part. Each entry states its license, and each one gets a screenshot so you can see what it is before you click.

If you want everything that exists for shadcn/ui, [awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) is bigger. This index is deliberately narrower: only free resources that extend shadcn/ui, and none of them marked verified until someone has opened the link and checked the license.

## Status

Work in progress. Most entries are `verified`. The few still marked `candidate` have an open question, usually a missing license, and the question is written in their `notes`. Screenshots come next.

## Categories

| Category | What goes in it |
|---|---|
| `components` | Single components and component libraries |
| `blocks` | Ready-made sections such as hero, pricing, footer and auth |
| `animation` | Animated components |
| `dashboards` | Admin panels and dashboard starters |
| `templates` | Full sites, landing pages and app starters |
| `themes` | Color themes, theme generators and design tokens |
| `extensions` | Add-ons, editors, form builders and CLI tools |
| `charts` | Chart components |
| `design-kits` | Figma kits |
| `ports` | shadcn/ui for other frameworks, such as Vue and Solid |

## What is left out

Some things turn up on every shadcn list without being extensions. They go in `excluded.yaml` with one of these reasons, so they are not added again on the next harvest:

| Reason | Meaning |
|---|---|
| `core` | shadcn/ui itself and its docs |
| `upstream` | A library shadcn/ui is built on, or a headless primitive layer, such as Radix, cmdk or Recharts |
| `not-shadcn` | Tailwind CSS or React UI that is not built on shadcn/ui |
| `showcase` | An app that uses shadcn/ui but is not meant to be reused |
| `aggregator` | A general directory; the shadcn-specific ones are in `sources.md` |

## Files

| Path | Contents |
|---|---|
| `catalog.yaml` | The index, one entry per resource |
| `excluded.yaml` | What was considered and left out, with the reason |
| `sources.md` | Lists and directories we harvest links from |
| `screenshots/<slug>.webp` | One screenshot per entry, named after its `slug` |

## Entry format

```yaml
- slug: magic-ui
  name: Magic UI
  description: Animated landing page components. Open-source core plus a paid Pro tier.
  url: https://magicui.design
  repo: https://github.com/magicuidesign/magicui
  category: animation
  license: MIT
  free: partial      # full | partial | unknown
  status: candidate  # candidate | verified | screenshotted
  source: manual     # a source from sources.md, or manual
  screenshot: screenshots/magic-ui.webp
  notes: ""
```

`free: partial` means a free part next to a paid tier, and `url` then points straight at the free part. `license` is the SPDX identifier where one exists, and otherwise the license as the project names it, such as `MIT + Commons Clause`. `source` names the list the entry was harvested from, or `manual` when it was added by hand. Fields that are not known yet, such as `repo` or `license`, are left out until they are.

## How an entry gets in

1. **Harvest.** Go through `sources.md` and add new links to `catalog.yaml` as `candidate`, after searching both `catalog.yaml` and `excluded.yaml` for the URL.
2. **Verify.** Open the link. Confirm that the resource extends shadcn/ui and is free, fill in `license`, `repo` and `free`, then set `verified`. An entry whose license cannot be found stays `candidate`, with the reason in `notes`.
3. **Screenshot.** Capture the public demo or landing page and set `screenshotted`.
4. **Publish.** A gallery generated from `catalog.yaml` is planned but not built yet.

## Screenshots and removal

Screenshots are taken from each project's public demo or landing page and link back to the source. If you own a listed project and want the entry or its screenshot removed, open an issue. It will be taken down.

## Contributing

Suggestions, corrections and removal requests are all welcome. See [contributing.md](contributing.md).

## License

The index itself (`catalog.yaml`, `excluded.yaml`, `sources.md` and this readme) is dedicated to the public domain under [CC0 1.0](license). Use it for anything.

The listed projects keep their own licenses, noted per entry. Screenshots show other people's work and belong to their respective owners; the CC0 dedication does not cover them.

This project is not affiliated with shadcn/ui or its authors.
