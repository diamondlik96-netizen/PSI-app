# How to add a project to the Portfolio

Two steps: drop in your photos, then add a few lines of text. No design tools needed.

## Step 1 — Drop in the photos

Go to the folder:

```
public/assets/projects/
```

Inside it, make a **new folder** named after the project, using lowercase letters and dashes only (no spaces). This name is also how you'll refer to the project in Step 2, so keep it short and unique. For example, for a new job at "Riverside Middle School":

```
public/assets/projects/riverside-middle-school/
```

Drag your photo files into that folder. Name them whatever's easiest — `1.jpg`, `2.jpg`, `3.jpg` works well, or descriptive names like `entrance.jpg` if you prefer. JPG or PNG both work. The **first photo** in the list (Step 2) becomes the cover photo shown everywhere the project is listed, so put your best shot first.

## Step 2 — Add the project's details

Open this file in any text editor (or ask Claude to do it for you):

```
src/data/seed.ts
```

Near the top, find the `projects` array — it starts with a comment block showing exactly this template. Copy it, paste it as a new entry in the array (anywhere in the list), and fill in your details:

```ts
{
  id: 'riverside-middle-school',              // must match your folder name from Step 1
  name: 'Riverside Middle School — Gym Divider Curtains',
  industry: 'Education',                      // see the list of valid options below
  productType: 'Divider Curtains',             // see the list of valid options below
  location: 'Riverside, CA',
  photos: [
    { src: '/assets/projects/riverside-middle-school/1.jpg', caption: 'Installed divider curtain, closed position' },
    { src: '/assets/projects/riverside-middle-school/2.jpg', caption: 'Motor and track detail' },
    { src: '/assets/projects/riverside-middle-school/3.jpg' },   // caption is optional
  ],
  summary: 'Installed a motorized divider curtain across the main gymnasium for flexible multi-use scheduling.',
  testimonial: null,                            // or a quote from the client, e.g. 'PSI made this painless.'
},
```

Save the file. That's it — the project now shows up in the Portfolio (with photo filtering by industry/type) on both the phone app and the website, complete with a tap-to-enlarge photo gallery on its detail page.

### Valid industries
`Hospitality`, `Education`, `Recreation`, `Government`, `Commercial`

### Valid project types
`Operable Partitions`, `Bleachers`, `Basketball Systems`, `Volleyball Systems`, `Divider Curtains`, `Wall Padding`

*(Both lists live near the top of `src/data/seed.ts` too, as `industries` and `productTypes` — add a new one there first if you need a category that isn't listed.)*

## Notes

- A project can have as few as **zero** photos (it'll show a placeholder box until you add some) or as many as you like.
- Want a project to show up in the "Featured projects" row on the homepage? Add `featured: true` right after `id`.
- Want to remove a project? Delete its whole `{ ... }` block from the `projects` array (and optionally its photo folder).
- Any change to this file requires redeploying for it to go live — if you're not sure how, just ask Claude to "add this project and deploy it."
