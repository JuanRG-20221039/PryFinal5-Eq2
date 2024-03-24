const routes = {
    home: '/',
    login: '/login',
    registro: '/register',
    recuperacion:'/recovery',

    productosRojos: '/productsRed',
    productosTropicales: '/productsTropi',
    productosSemillas: '/productsSeeds',
    
    detalleProducto: '/products/:id',

    quienesSomos: '/about',
    contacto: '/contact',
    faq: '/faq',

    politicas: '/policy',
    mision: '/mision',
    vision: '/vision',

    comentarios: '/comments',
    bienvenida: '/welcome',
    perfil: '/account',
    comentariosU: '/user/comments',
    iotU:'/user/iot/',
    iotDashboardU: 'dashboard',
    iotDevicesU:'devices',
    iotDeviceU:'devices/:id',
    usuariosA: '/admin/users',
    productsA: '/admin/products',
    iotA: '/admin/iot',
    SmartGlass: '/SmartGlass',
    administradoresA: '/admin/administradores'
}

export default routes;