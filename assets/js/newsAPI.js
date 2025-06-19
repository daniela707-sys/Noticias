// Namespace para evitar conflictos globales
const NewsAPI = (function() {
    // Datos de ejemplo
    const newsData = [
        {
            id: 1,
            title: "Programa de formación en emprendimiento digital",
            summary: "El SENA lanza un nuevo programa para formar emprendedores en el ámbito digital con énfasis en marketing y comercio electrónico.",
            image: "https://inkscape.app/wp-content/uploads/imagen-vectorial.webp",
            date: "2025-01-01",
            author: "Centro de Emprendimiento",
            category: "Formación",
            content: "Contenido completo de la noticia aquí..."
        },
        {
            id: 2,
            title: "Convocatoria para participar en feria de emprendimiento",
            summary: "Abierta convocatoria para emprendedores SENA que deseen participar en la feria nacional de emprendimiento.",
            image: "https://inkscape.app/wp-content/uploads/imagen-vectorial.webp",
            date: "2025-06-02",
            author: "Dirección General",
            category: "Convocatorias",
            content: "Contenido completo de la noticia aquí..."
        },
        {
            id: 3,
            title: "Evento de networking para emprendedores",
            summary: "Se realiza un evento de networking para emprendedores SENA con empresas y profesionales del sector.",
            image: "https://inkscape.app/wp-content/uploads/imagen-vectorial.webp",
            date: "2025-07-10",
            author: "Comunidad Emprendedora",
            category: "Eventos",
            content: "Contenido completo de la noticia aquí..."
        },
        {
            id: 4,
            title: "Taller de desarrollo de software para emprendedores",
            summary: "El SENA lanza un taller de desarrollo de software para emprendedores con énfasis en desarrollo web y móvil.",
            image: "https://inkscape.app/wp-content/uploads/imagen-vectorial.webp",
            date: "2025-08-20",
            author: "Centro de Emprendimiento",
            category: "Emprendimiento",
            content: "Contenido completo de la noticia aquí..."
        },
        {  
            id:5,
            title: "Nuevo programa de formación en emprendimiento digital",
            summary: "El SENA lanza un nuevo programa para formar emprendedores en el ámbito digital con énfasis en marketing y comercio electrónico.",
            image: "https://inkscape.app/wp-content/uploads/imagen-vectorial.webp",
            date: "2025-05-15",
            author: "Centro de Emprendimiento",
            category: "Formación",
            content: "Contenido completo de la noticia aquí..."
        },
        {
            id: 6,
            title: "Convocatoria para participar en feria de emprendimiento",
            summary: "Abierta convocatoria para emprendedores SENA que deseen participar en la feria nacional de emprendimiento.",
            image: "https://inkscape.app/wp-content/uploads/imagen-vectorial.webp",
            date: "2025-06-02",
            author: "Dirección General",
            category: "Convocatorias",
            content: "Contenido completo de la noticia aquí..."
        },
        {
            id: 7,
            title: "Convocatoria para participar en feria de emprendimiento",
            summary: "Abierta convocatoria para emprendedores SENA que deseen participar en la feria nacional de emprendimiento.",
            image: "https://inkscape.app/wp-content/uploads/imagen-vectorial.webp",
            date: "2025-06-02",
            author: "Dirección General",
            category: "Convocatorias",
            content: "Contenido completo de la noticia aquí..."
        },
         {
            id: 8,
            title: "Convocatoria para participar en feria de emprendimiento",
            summary: "Abierta convocatoria para emprendedores SENA que deseen participar en la feria nacional de emprendimiento.",
            image: "https://inkscape.app/wp-content/uploads/imagen-vectorial.webp",
            date: "2025-06-02",
            author: "Dirección General",
            category: "Convocatorias",
            content: "Contenido completo de la noticia aquí..."
        },
         {
            id: 9,
            title: "Convocatoria para participar en feria de emprendimiento",
            summary: "Abierta convocatoria para emprendedores SENA que deseen participar en la feria nacional de emprendimiento.",
            image: "https://inkscape.app/wp-content/uploads/imagen-vectorial.webp",
            date: "2025-06-02",
            author: "Dirección General",
            category: "Convocatorias",
            content: "Contenido completo de la noticia aquí..."
        }
    ];

    // Variable para almacenar las noticias filtradas actualmente
    let currentFilteredNews = [...newsData];

    // Formatear fecha
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }


    // Mostrar detalle de noticia en modal
    function showNewsDetail(newsItem) {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.querySelector('#newsModal .modal-body');
        
        if (!modalTitle || !modalBody) {
            console.error('Elementos del modal no encontrados');
            return;
        }
        
        modalTitle.textContent = newsItem.title;
        modalBody.innerHTML = `
            <img src="${newsItem.image}" class="img-fluid rounded mb-3" alt="${newsItem.title}">
            <div class="d-flex justify-content-between mb-3">
                <span class="badge bg-primary">${newsItem.category}</span>
                <div>
                    <small class="text-muted">${formatDate(newsItem.date)}</small>
                    <small class="text-muted ms-2">Publicado por: ${newsItem.author}</small>
                </div>
            </div>
            <p>${newsItem.summary}</p>
            <p>${newsItem.content}</p>
        `;
        
        const newsModal = new bootstrap.Modal(document.getElementById('newsModal'));
        newsModal.show();
    }

    // Función pública para mostrar noticias
    function displayNews(news = null) {
        const newsContainer = document.getElementById('newsContainer');
        const newsCount = document.getElementById('newsCount');
        
        if (!newsContainer || !newsCount) {
            console.error('Elementos del DOM no encontrados');
            return;
        }
        
        // Si no se proporciona un array de noticias, usar todos los datos
        const dataToDisplay = news || currentFilteredNews;
        
        newsContainer.innerHTML = '';
        newsCount.textContent = dataToDisplay.length;
        
        dataToDisplay.forEach(item => {
            const newsCard = document.createElement('div');
            newsCard.className = 'col';
            newsCard.innerHTML = `
                <div class="card news-card h-100 w-2000 upsitve-card">
                    <div class="card-header upsitve-header">
                        ${item.category}
                    </div>
                    <img src="${item.image}" alt="${item.title}" class="card-image">
                    <div class="card-body upsitve-body">
                        <div class="d-flex justify-content-between author-info mb-3">
                            <span>${item.author}</span>
                            <span>${formatDate(item.date)}</span>
                        </div>
                        <h4 class="news-title">${item.title}</h4>
                        <p class="card-text">${item.summary}</p>
                    </div>
                    <button class="cta" data-id="${item.id}">
                        <span>Ver mas</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                    </button>
                </div>
            `;
            newsContainer.appendChild(newsCard);
        });

        // Event listeners para botones "Ver más"
        document.querySelectorAll('.cta').forEach(button => {
            button.addEventListener('click', function() {
                const newsId = parseInt(this.getAttribute('data-id'));
                const newsItem = newsData.find(item => item.id === newsId);
                showNewsDetail(newsItem);
            });
        });
    }

    // Función para filtrar noticias
    function filterNewsData(searchTerm = '', category = '', date = '', author = '') {
        searchTerm = searchTerm.toLowerCase();
        currentFilteredNews = newsData.filter(item => {
            return (item.title.toLowerCase().includes(searchTerm)) &&
                   (category === '' || item.category === category) &&
                   (date === '' || item.date === date) &&
                   (author === '' || item.author === author);
        });
        
        // Disparar un evento personalizado para notificar que los filtros han cambiado
        document.dispatchEvent(new CustomEvent('newsFiltered'));
        
        return currentFilteredNews;
    }

    // Exponer funciones públicas
    return {
        displayNews: displayNews,
        filterNewsData: filterNewsData,
        getAllNews: function() { return [...currentFilteredNews]; },
        getOriginalNews: function() { return [...newsData]; }
    };
})();