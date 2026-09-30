---
description: "Browsing, searching, uploading, downloading and organising files in Drive."
pageClass: mobile-manual
---

# Drive

Drive is your organisation's shared file store. Use it to keep project
documents, photos and drawings in folders, find files quickly, and download them
to your phone. Files in Drive can also be attached to Exto AI questions ([Attach
files](/mobile/exto-ai#attach-files)).

Open it from **Menu** › **Drive**. The header reads "Drive — Browse folders &
files". Drive needs an internet connection.

## What you see

- **Tabs:** **Files** (all folders and files), **Starred** (items you have
  starred), **Shared** (items others have shared with you) and **Recent**
  (recently used files).
- **Search in Drive** and a button to switch between grid and list view.
- A path below the search box, starting with **All Files**.
- **Folders (n)** and **Files (n)** sections.

In grid view, a folder card shows its name and context (for example the project,
or TENANT). A file card shows its type icon, version (for example v1), name,
size, date, context and the owner's initials. A ★ marks starred items.

<Shot src="mobile/drive" alt="Drive in grid view after an upload. The green message confirms &quot;1 file uploaded successfully&quot;."
  caption="Drive in grid view after an upload. The green message confirms &quot;1 file uploaded successfully&quot;." />

List view shows each folder and file on one row with the date it was created.

<Shot src="mobile/drive-list" alt="Drive in list view. Each row shows the name and &quot;Created&quot; date and time; ⋯ opens the item&#x27;s options."
  caption="Drive in list view. Each row shows the name and &quot;Created&quot; date and time; ⋯ opens the item&#x27;s options." />

## Browse folders

1. Tap a folder to open it. The header shows the folder name and the path shows
    where you are, for example **All Files › FB**.
2. To go back up, tap **All Files** or a folder name in the path, or use the
    back arrow.

<Shot src="mobile/drive-infolder" alt="Inside the folder FB. The path under the search box shows All Files › FB."
  caption="Inside the folder FB. The path under the search box shows All Files › FB." />

On the **Files** tab, Drive remembers the folder you were in when you switch to
another tab and back.

## Search

Type in **Search in Drive**. Matching folders and files are listed. On the Files
tab the search covers all folders, not only the one you are in. Tap ✕ to clear
the search.

## Upload files

1. Tap **+** at the top right and choose **Upload file**.

<Shot src="mobile/drive-new" alt="The + menu with Upload file and Create Folder."
  caption="The + menu with Upload file and Create Folder." />

2. In **Upload Files**, choose a **Context** (for example "DEFAULT / AB Project
    1"). If you are inside a folder, the folder's context is used and shown as
    "Inherited from parent folder".
3. Tap **Tap to choose files** and pick one or more files. Each file is listed
    with its size; tap ✕ to remove one, or **+ Add more files** to add more.
4. Tap **Upload**. It is available only once a context and at least one file
    are chosen.

<Shot src="mobile/drive-upload" alt="The Upload Files sheet with a context and one file selected. The supported formats are listed under the files."
  caption="The Upload Files sheet with a context and one file selected. The supported formats are listed under the files." />

5. When the upload finishes, the sheet closes, the message "{n} file(s)
    uploaded successfully" appears, and the file is listed. If a file fails, it
    is marked in red with the reason and "{n} file(s) failed to upload" appears;
    the sheet stays open.

## Create a folder

1. Tap **+** and choose **Create Folder**.
2. Choose a **Context** (inherited when you are inside a folder).
3. Enter a **Folder Name**.
4. Enter a **Document number pattern** that includes **{SEQ}**, for example
    "as/{SEQ}". The hint under the field reminds you: "{SEQ} must be present".
5. Tap **Create**. It is available only when all fields are filled and the
    pattern contains {SEQ}.
6. The sheet closes and the new folder appears in the list.

<Shot src="mobile/drive-folder" alt="The New Folder sheet. Create stays disabled until the fields are complete."
  caption="The New Folder sheet. Create stays disabled until the fields are complete." />

## Star, download or delete

Tap ⋯ on a folder or file, or tap a file, to see its options:

- **Add to Starred** / **Remove from Starred**: the item appears in (or leaves)
  the **Starred** tab.
- **Download** (files only): a progress message "Downloading \<name\>… n%"
  appears; the file is saved to your phone's Downloads folder and opened. The
  result is "Download successful" or "Download failed".
- **Delete**: asks for confirmation.

<Shot src="mobile/drive-fileopts" alt="The options for a file: Add to Starred, Download and Delete."
  caption="The options for a file: Add to Starred, Download and Delete." />

### Delete a file or folder

1. Tap ⋯ and choose **Delete**.
2. Read the message. For a file: "Are you sure you want to delete "\<name\>"?
    This action cannot be undone." For a folder: "\<name\> might contain files
    and subfolders. Deleting it will permanently remove all its contents. This
    action cannot be undone."
3. Tap **Delete** to confirm, or **Cancel**.

<Shot src="mobile/drive-delfolder" alt="The Delete Folder confirmation."
  caption="The Delete Folder confirmation." />

## Notes

- Files cannot be previewed inside the app; download them to open them.
- Items are always listed A–Z by name, including on the **Recent** tab.
- The upload sheet lists supported formats (images, PDF, Word, Excel,
  PowerPoint, dwg, rvt, xer, xml).
