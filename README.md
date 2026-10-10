# shadcn-freebies

En samlad, kategoriserad katalog över **gratis** resurser till shadcn/ui: block, komponenter, dashboards, mallar, teman och tillägg. Varje post ska ha en skärmdump så att man ser vad det är utan att klicka.

## Struktur

| Sökväg | Innehåll |
|---|---|
| `kallor.md` | Aggregatorer och listor vi skördar länkar från |
| `inkorg/` | Rålistor som väntar på dedupe och inläsning i katalogen |
| `katalog.yaml` | Huvudkatalogen, en post per resurs (master-data) |
| `screenshots/<kategori>/<slug>.png` | Skärmdumpar, namngivna efter postens `slug` |

## Kategorier

- `blocks`: färdiga sektioner (hero, pricing, footer, auth …)
- `components`: enskilda komponenter och komponentbibliotek
- `dashboards`: admin-paneler och dashboard-starters
- `templates`: hela sajter och landningssidor
- `themes`: färgteman, theme-generatorer och designtokens
- `extensions`: tillägg, plugins, CLI-verktyg, editorer, formulärbyggare
- `animation`: animerade komponenter (motion-baserade)
- `charts`: diagrambibliotek och diagramkomponenter
- `primitives`: headless-grunder som shadcn bygger på (Radix, Base UI, Ark …)
- `tailwind-portable`: Tailwind-block som inte är shadcn-native men går att porta
- `showcase-repos`: riktiga open source-appar byggda med shadcn, att låna mönster från
- `design-kits`: Figma-kit och designresurser
- `ports`: shadcn för andra ramverk (Vue, Solid …)

## Postformat (katalog.yaml)

```yaml
- slug: magic-ui
  name: Magic UI
  url: https://magicui.design
  repo: https://github.com/magicuidesign/magicui
  category: components
  license: MIT
  free: full        # full | partial (gratisdel + betald pro) | unknown
  status: candidate # candidate -> verified -> screenshotted
  source: awesome-shadcn-ui
  screenshot: screenshots/components/magic-ui.png
  notes: ""
```

## Arbetsflöde

1. **Skörda**: gå igenom `kallor.md`, lägg till nya poster i `katalog.yaml` med `status: candidate`.
2. **Verifiera**: kolla att länken lever, att det faktiskt är gratis, sätt `license` och `free`. Byt status till `verified`.
3. **Skärmdumpa**: ta en bild av demo-/förhandsvisningssidan och sätt `status: screenshotted`.
4. **Generera**: (senare) bygg en README-galleri- eller webbvy automatiskt från `katalog.yaml`.

## Regler

- Bara saker som går att använda gratis. Freemium-sajter tas med som `free: partial` och då länkar vi direkt till gratisdelen.
- Dubbletter: samma resurs listas en gång, även om den finns i flera källor. Notera källan i `source`.
- Licens noteras alltid när den är känd.
