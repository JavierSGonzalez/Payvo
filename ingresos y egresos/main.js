const btnIncomes = document.getElementById('btnIncomes');
            const btnExpenses = document.getElementById('btnExpenses');
            const slider = document.getElementById('slider');
            const s1 = document.getElementById('seccion1');
            const s1a = document.getElementById('seccion1a');
            const s1b = document.getElementById('seccion1b');
            const s2 = document.getElementById('seccion2');
            const s2a = document.getElementById('seccion2a');
            const s2b = document.getElementById('seccion2b');

            btnIncomes.addEventListener('click', () => {
                slider.style.left = '0.25rem'; 
                s1.classList.remove('hidden');
                s1a.classList.remove('hidden');
                s1b.classList.remove('hidden');
                s2.classList.add('hidden');
                s2a.classList.add('hidden');
                s2b.classList.add('hidden');
            });

            btnExpenses.addEventListener('click', () => {
                slider.style.left = '50%'; 
                s2.classList.remove('hidden');
                s2a.classList.remove('hidden');
                s2b.classList.remove('hidden');
                s1.classList.add('hidden');
                s1a.classList.add('hidden');
                s1b.classList.add('hidden');
            });
