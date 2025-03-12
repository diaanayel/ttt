export async function getPlayersData(form, dialog, btnCancel) {
  return new Promise((resolve, reject) => {
    function handleSubmit(e) {
      e.preventDefault();

      const formData = new FormData(form);
      const p1name   = formData.get("p1name");
      const p1mark   = formData.get("p1mark");
      const p2name   = formData.get("p2name");
      const p2mark   = formData.get("p2mark");

      if (p1mark === p2mark || p1name === p2name) {
        alert("Choose different names and marks!");
        reject(new Error("Invalid data!"));
        return;
      }

      const p1 = { name: p1name, mark: p1mark };
      const p2 = { name: p2name, mark: p2mark };

      closeDialog(dialog);
      form.removeEventListener("submit", handleSubmit);
      resolve({p1, p2});
    }

    function handleCancel() {
      closeDialog(dialog);
      form.removeEventListener("submit", handleSubmit);
      btnCancel.removeEventListener("click", handleCancel);
      reject("Canceled!");
    }

    form.addEventListener("submit", handleSubmit);
    btnCancel.addEventListener("click", handleCancel);
  });
}

export function promptPlayersData(dialog) { dialog.showModal(); }
export function closeDialog(dialog) { dialog.close(); }
