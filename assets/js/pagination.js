// Módulo de paginación
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de paginación
    const itemsPerPage = 6; // Número de noticias por página
    let currentPage = 1;
    
    // Referencias a elementos de paginación
    const prevPageBtn = document.querySelector('.pagination .page-item:first-child .page-link');
    const nextPageBtn = document.querySelector('.pagination .page-item:last-child .page-link');
    const pageLinks = document.querySelectorAll('.pagination .page-item:not(:first-child):not(:last-child) .page-link');
    
    // Inicializar paginación
    function initPagination() {
        if (!NewsAPI) return;
        
        updatePaginationUI();
        
        // Configurar event listeners
        pageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = parseInt(this.textContent);
                updateActivePage();
                loadCurrentPage();
            });
        });
        
        prevPageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                updateActivePage();
                loadCurrentPage();
            }
        });
        
        nextPageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const totalPages = Math.ceil(NewsAPI.getAllNews().length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                updateActivePage();
                loadCurrentPage();
            }
        });
        
        // Escuchar el evento de filtrado de noticias
        document.addEventListener('newsFiltered', function() {
            // Reiniciar a la primera página cuando se aplican filtros
            currentPage = 1;
            updatePaginationUI();
            loadCurrentPage();
        });
        
        // Cargar primera página
        updateActivePage();
        loadCurrentPage();
    }
    
    // Actualizar la UI de paginación basada en las noticias filtradas
    function updatePaginationUI() {
        const allNews = NewsAPI.getAllNews();
        const totalPages = Math.ceil(allNews.length / itemsPerPage);
        
        // Actualizar números de página
        pageLinks.forEach((link, index) => {
            if (index < totalPages) {
                link.textContent = index + 1;
                link.parentElement.style.display = 'block';
            } else {
                link.parentElement.style.display = 'none';
            }
        });
        
        updateActivePage();
    }
    
    // Actualizar página activa en la UI
    function updateActivePage() {
        // Actualizar estado de botones anterior/siguiente
        prevPageBtn.parentElement.classList.toggle('disabled', currentPage === 1);
        
        const totalPages = Math.ceil(NewsAPI.getAllNews().length / itemsPerPage);
        nextPageBtn.parentElement.classList.toggle('disabled', currentPage === totalPages);
        
        // Actualizar clase activa en los números de página
        pageLinks.forEach((link, index) => {
            const pageNum = index + 1;
            link.parentElement.classList.toggle('active', pageNum === currentPage);
        });
    }
    
    // Cargar noticias de la página actual
    function loadCurrentPage() {
        const allNews = NewsAPI.getAllNews();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageNews = allNews.slice(startIndex, endIndex);
        
        NewsAPI.displayNews(pageNews);
    }
    
    // Inicializar cuando el DOM esté listo
    if (NewsAPI) {
        initPagination();
    }
});