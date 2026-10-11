# Contributing

Suggestions are welcome. The bar for getting into the index is narrow on purpose, so read the two criteria before you open an issue or a pull request.

## What gets in

- **It extends shadcn/ui.** It installs through the shadcn CLI or a shadcn registry, is built on shadcn/ui components, or produces themes, code or designs for shadcn/ui.
- **It is free to use.** A freemium site can be listed with `free: partial`, and the link then goes straight to the free part.

Plenty of good projects fail the first test. shadcn/ui itself and the libraries it builds on, Tailwind CSS kits that are not built on shadcn/ui, apps that happen to use it, and general directories all stay out. They are listed in `excluded.yaml` with the reason, so the same links do not come back on every harvest.

## Suggest a resource

Open an issue with the link and one line on what it is. That is enough; the checking happens on our side.

You can also open a pull request that adds an entry to `catalog.yaml` with `status: candidate`. Search `catalog.yaml` and `excluded.yaml` for the URL first. New entries go under their category, in alphabetical order by `slug`, and follow the entry format in the [readme](readme.md#entry-format).

## Report a problem

A dead link or a wrong license? Open an issue and name the entry.

## Ask for removal

If you own a listed project and want the entry or its screenshot taken down, open an issue. It comes out, no questions asked.
