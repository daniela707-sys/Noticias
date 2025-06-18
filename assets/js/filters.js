// Filtrar noticias
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const authorFilter = document.getElementById('authorFilter');
    const resetFilters = document.getElementById('resetFilters');
    const createNewsBtn = document.getElementById('createNewsBtn');
    
    // Función para filtrar noticias
    function filterNews() {
        if (!NewsAPI || !NewsAPI.filterNewsData) {
            console.error('NewsAPI no está disponible');
            return;
        }
        
        const searchTerm = searchInput.value;
        const category = categoryFilter.value;
        const date = dateFilter.value;
        const author = authorFilter.value;
        
        // Aplicar filtros - esto disparará el evento 'newsFiltered'
        NewsAPI.filterNewsData(searchTerm, category, date, author);
    }
    
    // Asignar event listeners
    if (searchInput) searchInput.addEventListener('input', filterNews);
    if (categoryFilter) categoryFilter.addEventListener('change', filterNews);
    if (dateFilter) dateFilter.addEventListener('change', filterNews);
    if (authorFilter) authorFilter.addEventListener('change', filterNews);
    
    // Resetear filtros
    if (resetFilters) {
        resetFilters.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (categoryFilter) categoryFilter.value = '';
            if (dateFilter) dateFilter.value = '';
            if (authorFilter) authorFilter.value = '';
            filterNews();
        });
    }
    
    // Crear nueva noticia
    if (createNewsBtn) {
        createNewsBtn.addEventListener('click', function() {
            const modalTitle = document.getElementById('modalTitle');
            const modalBody = document.querySelector('#newsModal .modal-body');
            
            if (!modalTitle || !modalBody) {
                console.error('Elementos del modal no encontrados');
                return;
            }
            
            modalTitle.textContent = "Crear Nueva Noticia";
            modalBody.innerHTML = `
                <form id="newsForm">
                    <div class="mb-3">
                        <label for="newsTitle" class="form-label">Título</label>
                        <input type="text" class="form-control" id="newsTitle" required>
                    </div>
                    <div class="mb-3">
                        <label for="newsCategory" class="form-label">Categoría</label>
                        <select class="form-select" id="newsCategory" required>
                            <option value="">Seleccionar...</option>
                            <option value="Emprendimiento">Emprendimiento</option>
                            <option value="Formación">Formación</option>
                            <option value="Eventos">Eventos</option>
                            <option value="Convocatorias">Convocatorias</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="newsImage" class="form-label">URL de la imagen</label>
                        <input type="url" class="form-control" id="newsImage" required>
                    </div>
                    <div class="mb-3">
                        <label for="newsSummary" class="form-label">Resumen</label>
                        <textarea class="form-control" id="newsSummary" rows="3" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="newsContent" class="form-label">Contenido completo</label>
                        <textarea class="form-control" id="newsContent" rows="5" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="newsAuthor" class="form-label">Autor</label>
                        <input type="text" class="form-control" id="newsAuthor" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar Noticia</button>
                </form>
            `;
            
            const newsForm = document.getElementById('newsForm');
            if (newsForm) {
                newsForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Noticia creada exitosamente!');
                    const modal = bootstrap.Modal.getInstance(document.getElementById('newsModal'));
                    if (modal) modal.hide();
                });
            }
            
            const newsModal = new bootstrap.Modal(document.getElementById('newsModal'));
            newsModal.show();
        });
    }
});