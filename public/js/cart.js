document.addEventListener("click", async (e) => {
    if(!e.target.dataset.id)
        return;
    const id = e.target.dataset.id;

    let url = null;
    let method = "POST";

    if(e.target.classList.contains("btn-plus")){
        url =`/cart/ajax/increase/${id}`;
    }

    if(e.target.classList.contains("btn-minus")){
        url =`/cart/ajax/decrease/${id}`;
    }

    if(e.target.classList.contains("btn-remove")){
        url =`/cart/ajax/remove/${id}`;
        method = "DELETE";
    }

    const res = await fetch(url, {method});
    const data = await res.json();

    updateCartUI(data.cart);
});


function updateCartUI(cart){
    let total = 0;

    cart.forEach(item => {
        const row = document.querySelector(`tr[data-id="${item.id}"]`);
        if(!row)
            return;

        row.querySelector(".qty").innerText = item.qty;
        row.querySelector(".row-total").innerText = item.price * item.qty;

        total += item.price * item.qty;
    });


    const totalEl = document.getElementById("cart-total");
    if(totalEl){
        totalEl.innerHTML = total;
    }

    document.querySelectorAll("tr[data-id]").forEach(row => {
        const id = row.dataset.id;
        if(!cart.find(i => i.id == id)){
            row.remove();
        }
    });


    if(cart.length === 0){
        document.getElementById("cart-table").remove();
        document.getElementById("cart-total").innerHTML = "0";
    }
}
