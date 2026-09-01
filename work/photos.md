---
description: "The image gallery, its viewer and edit room — and its three permission questions."
---

# Photos

A gallery over every image in the tenant. It is not a separate store: Photos is
a filtered view of the same documents [Drive](/work/documents) holds, showing
only files that are images.

<Shot src="work/photos" alt="The Photos gallery" pending
  caption="The By date gallery, with scope chips on Drive photos and a module chip on the rest." />

## Two kinds of photo

Every image arrived one of two ways, and the gallery marks which:

| Kind | How it got there | Chip |
| --- | --- | --- |
| **Module photo** | Attached to a record — an inspection, a defect. | `Module · Record`, on hover. |
| **Drive photo** | Uploaded to Drive with no record link. | A permanent **Drive** chip, coloured by scope. |

The Drive chip is always visible rather than appearing on hover, so an upload
that never got attached to anything is obvious at a glance.

## Browsing

**By date** is where you land. Photos are grouped into *this week*, *last week*,
*earlier in the month*, then older months.

**Modules** shows one cover-led card per module that has photos, each with a
count of photos and records. Opening one drills into that module's photos,
**grouped by record**.

**Favourites** filters to starred photos.

::: warning Stars are tenant-wide, not personal
Starring a photo stars it for **everyone** who can see it. This matches Drive's
model, and it means favourites are a shared shortlist rather than a private one.
:::

## Finding a photo

One search box filters in place, matching titles, tags, document numbers,
uploader and project or workspace name.

The filter popover adds:

| Filter | Options |
| --- | --- |
| **Type** | All, module records, or Drive photos. |
| **Scope** | Tenant, workspace or project. |
| **Module** | One or more. |
| **Record** | Appears once a module is chosen. |
| **Created by** | The uploader. |
| **Date range** | From and to. |
| **Favourites only** | A checkbox. |

Each list shows the top six by photo count, with a search box and a **show more**
expander beyond that. **Apply** carries a live count of how many photos match
your draft filters, so you know what you are about to get before you commit.

Choosing **Drive photos** hides the module and record filters, since they cannot
apply — and if you were browsing by module, it drops you into the flat gallery,
because Drive photos have no module to browse.

## The viewer

Opening a photo goes full screen.

- **Navigate** with the arrows, the ← → keys, or the **filmstrip** along the
  bottom.
- **Zoom** by scrolling, double-clicking or pinching.
- **Rotate** and go **fullscreen** from the footer.
- **Info** slides a details panel in from the right — the stage shifts left, so
  nothing is covered.
- The chrome **fades out** when the pointer is idle and returns on movement, so
  the photo gets the whole screen.
- <kbd>Esc</kbd> closes.

A photo whose file is missing shows a clean placeholder rather than a broken
image.

## The info panel

Thumbnail, name — editable if you may — module, record, scope, uploader, date,
size, dimensions, category and tags. It scrolls independently of the gallery
behind it, and repeats the main actions.

## The edit room

**Edit** opens a full-screen editor:

| Tool | Does |
| --- | --- |
| **Crop** | Free, original, 1:1, 4:3 or 16:9. |
| **Rotate** | 90° per click. |
| **Flip** | Horizontal. |
| **Adjust** | Brightness, contrast and saturation, −100 to +100. |

**Save in main image** bakes the edits and saves them as a **new version** of
the same photo — the original stays in version history, so an over-enthusiastic
crop is recoverable.

::: tip Not in this release
**Filters** and **Markup** appear in the tool rail but show a coming-soon
notice. **Save as copy**, and **Share** and **Delete** from inside the viewer,
are also not available yet.
:::

## Permissions

Three separate questions, and they are answered independently.

### Can you open Photos at all?

Yes if the **Photo** module is enabled in any of your groups, at any scope.
Otherwise the menu item is hidden.

### Can you see a given photo?

Two layers, and **both** must pass.

**Scope access.** You must be in a Photo-enabled group at the photo's scope — a
tenant group for a tenant photo, a project group for a project photo, with a
tenant group also covering project photos.

::: warning Uploading a photo does not guarantee you can see it
Scope access is enforced with no exception for creators. A photo you uploaded
into a scope you have no Photo access to will not appear for you.
:::

**Record visibility.** For a module photo, you must be able to see that module's
records at that scope — as a module owner, with **View all records**, or as a
configured workflow step participant. For a Drive photo, you must be on its
access list; a Drive photo with no list is visible to anyone who passed the
first layer.

The **uploader** always passes this second layer for their own photo — but still
has to pass the first.

### Can you edit or save it?

Renaming, replacing and saving from the edit room require **one** of:

- being a site administrator,
- being the photo's uploader, or
- being a module owner **at the photo's exact scope**.

A site administrator bypasses every layer above.

::: tip Workspace-level Photo access is not available yet
Photo access is granted at **tenant or project** level only. Workspace still
appears as a scope chip and filter for photos attached to workspace-level
records — you simply cannot grant Photo access *at* that level in this release.
:::

## Related

- [Documents](/work/documents) — Drive, and the collection Photos reads from.
- [Record widgets](/work/record-widgets) — attaching an image to a record.
