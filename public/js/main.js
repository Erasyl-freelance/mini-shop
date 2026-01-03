console.log("MAIN>JS LOADED");

document.addEventListener("DOMContentLoaded", () => {
    const deleteBtn = document.querySelectorAll(".delete-btn");

    deleteBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const ok = confirm("Bu ürünü silmek istediğinize emin misiniz?");
            if(!ok){
                e.preventDefault(); // iptal etmesi
            }
        });
    });
});

const form = document.querySelector("#productForm");
if(form){
    form.addEventListener("sumbit", (e) => {
        const title = document.querySelector("input[name='title']").value.trim();
        const price = document.querySelector("input[name='price']").value;
        const description = document.querySelector("input[name='description']").value.trim();


        if(title === ""){
            alert("Ürün adı boş olamaz!");
            e.preventDefault();
            return;
        }

        if(!price || Number(price) <= 0){
            alert("Fiyat 0'dan küçük olamaz!");
            e.preventDefault();
            return;
        }

        if(description === ""){
            alert("Ürün açıklaması boş olamaz!")
            e.preventDefault();
            return;
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const deleteLinks = document.querySelectorAll(".delete");
  
    deleteLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const confirmed = confirm("Bu ürünü silmek istediğinize emin misiniz?");
        if (!confirmed) {
          e.preventDefault();
        }
      });
    });
});
  
