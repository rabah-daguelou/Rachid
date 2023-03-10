<template>
    <div>
        
        <nav class="navigation-menu">
            <h1> Menu </h1>

            <ul>
                <li> <router-link to="/admin/addProduct"> Ajouter un produit </router-link></li>
                <li> <router-link to="/admin/addRealization"> Ajouter une réalisation </router-link></li>
                <li> <router-link to="/admin/bills"> Gestion des commandes </router-link></li>
                <li> <router-link to="/admin/orders"> Gestion des factures </router-link></li>
                <li> <router-link to="/admin/stocks"> Gestion des stocks </router-link></li>
            </ul>
        </nav>

    </div>
</template>

<script>
export default {
    name:'AdminNav'
}
</script>

<style scoped>

    .navigation-menu {
        background-color: rgb(220, 216, 216);
        border-radius: 2px;
        box-shadow: 2px 2px 5px;
        padding: 10px 2px;
    }
    ul {
        margin: 0;
        padding: 0;
    }
    li {
        width: 80%;
        list-style: none;
        background: rgb(106, 109, 106);
        margin: 10px auto;
        padding: 5px;
        border-radius: 5px;
        box-shadow: 1px 1px 1px;
        cursor: pointer;
    }
    nav ul li:active {
        background: #000;
    }
    li a {
        text-decoration: none;
        color: #fff;
    }
</style>