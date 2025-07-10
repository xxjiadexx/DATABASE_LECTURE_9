class DatabaseIndexingQuiz {
    constructor() {
        this.questions = this.initializeQuestions();
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.startTime = Date.now();
        this.timer = null;
        
        this.initializeElements();
        this.startQuiz();
        this.startTimer();
    }

    initializeElements() {
        this.elements = {
            currentQuestion: document.getElementById('current-question'),
            totalQuestions: document.getElementById('total-questions'),
            score: document.getElementById('score'),
            timer: document.getElementById('timer'),
            progress: document.getElementById('progress'),
            questionType: document.getElementById('question-type'),
            difficulty: document.getElementById('difficulty'),
            questionText: document.getElementById('question-text'),
            dataStructureDisplay: document.getElementById('data-structure-display'),
            indexComparison: document.getElementById('index-comparison'),
            performanceDisplay: document.getElementById('performance-display'),
            tableVisualization: document.getElementById('table-visualization'),
            algorithmDisplay: document.getElementById('algorithm-display'),
            codeBlock: document.getElementById('code-block'),
            optionsContainer: document.getElementById('options-container'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            quizContainer: document.getElementById('quiz-container'),
            resultsContainer: document.getElementById('results-container'),
            reviewContainer: document.getElementById('review-container'),
            finalScore: document.getElementById('final-score'),
            finalTotal: document.getElementById('final-total'),
            scorePercentage: document.getElementById('score-percentage'),
            timeTaken: document.getElementById('time-taken'),
            correctCount: document.getElementById('correct-count'),
            incorrectCount: document.getElementById('incorrect-count'),
            restartBtn: document.getElementById('restart-btn'),
            reviewBtn: document.getElementById('review-btn'),
            backToResults: document.getElementById('back-to-results'),
            reviewQuestions: document.getElementById('review-questions')
        };

        this.bindEvents();
    }

    bindEvents() {
        this.elements.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.elements.reviewBtn.addEventListener('click', () => this.showReview());
        this.elements.backToResults.addEventListener('click', () => this.showResults());
    }

    initializeQuestions() {
        return [
            {
                id: 1,
                type: "Multiple Choice",
                difficulty: "easy",
                question: "What is the primary purpose of database indexing?",
                options: [
                    "To increase storage space",
                    "To facilitate fast lookup and retrieval of records",
                    "To backup database records",
                    "To encrypt database data"
                ],
                correct: 1,
                explanation: "Database indexing creates a data structure to facilitate fast lookup and retrieval of requested records from a database, improving query performance."
            },
            {
                id: 2,
                type: "Data Structure Analysis",
                difficulty: "medium",
                question: "What are the main components in a database storage system?",
                dataStructureData: {
                    title: "Database Storage Components",
                    structure: [
                        { name: "Data File", type: "data", description: "Contains actual data records" },
                        { name: "Pages", type: "data", description: "Fixed-size units (4KB-32KB)" },
                        { name: "Index", type: "hash", description: "Fast lookup structure" },
                        { name: "Records", type: "data", description: "Individual data entries" }
                    ]
                },
                options: [
                    "Only data files and records",
                    "Data files, pages, and records",
                    "Only indexes and pages",
                    "Data files, pages, records, and indexes"
                ],
                correct: 3,
                explanation: "A complete database storage system includes data files (containing pages and records) and indexes for efficient data retrieval."
            },
            {
                id: 3,
                type: "Performance Analysis",
                difficulty: "medium",
                question: "What are the main performance issues without indexing?",
                performanceData: {
                    title: "Performance Impact Without Indexing",
                    metrics: [
                        { label: "Query Speed", value: "Slow", comparison: "vs Fast with indexes" },
                        { label: "Disk I/O", value: "High", comparison: "vs Low with indexes" },
                        { label: "Resource Usage", value: "Inefficient", comparison: "vs Optimized with indexes" },
                        { label: "Complex Queries", value: "Poor Support", comparison: "vs Good Support with indexes" }
                    ]
                },
                options: [
                    "Only slow performance",
                    "Slow performance and increased disk I/O",
                    "Slow performance, increased disk I/O, and inefficient resource usage",
                    "Only inefficient resource usage"
                ],
                correct: 2,
                explanation: "Without indexing, databases suffer from slow performance, increased disk I/O, inefficient resource usage, and lack of optimization for complex queries."
            },
            {
                id: 4,
                type: "Table Visualization",
                difficulty: "easy",
                question: "Looking at this Books table, which column would be most suitable for indexing?",
                tableData: {
                    title: "Books Table Example",
                    headers: ["ID", "Title", "Author", "Publication Year", "ISBN"],
                    rows: [
                        ["1", "To Kill a Mockingbird", "Harper Lee", "1960", "978-0-06-112008-4"],
                        ["2", "The Hobbit", "J.R.R. Tolkien", "1937", "978-0-547-92822-7"],
                        ["3", "Harry Potter", "J.K. Rowling", "1997", "978-0-439-70818-8"],
                        ["4", "1984", "George Orwell", "1949", "978-0-452-28423-4"],
                        ["5", "Pride and Prejudice", "Jane Austen", "1813", "978-0-14-143951-8"]
                    ],
                    indexColumn: 0
                },
                options: [
                    "Publication Year",
                    "Title",
                    "ID (Primary Key)",
                    "Author"
                ],
                correct: 2,
                explanation: "The ID column (Primary Key) is most suitable for indexing as it's unique, frequently used in queries, and provides the fastest lookup performance."
            },
            {
                id: 5,
                type: "Multiple Choice",
                difficulty: "easy",
                question: "What is a page in database storage?",
                options: [
                    "A single data record",
                    "A fixed-size unit of data set, ranging from 4KB to 32KB",
                    "An entire database table",
                    "A backup file"
                ],
                correct: 1,
                explanation: "A page is a fixed-size unit of data set in a database, typically ranging from 4KB to 32KB, containing multiple data records."
            },
            {
                id: 6,
                type: "Index Comparison",
                difficulty: "hard",
                question: "What are the key differences between hash-based and tree-based indexes?",
                indexComparisonData: {
                    title: "Hash-based vs Tree-based Indexes",
                    comparison: [
                        { feature: "Search Time", hash: "O(1) Average", tree: "O(log n)" },
                        { feature: "Range Queries", hash: "Not Supported", tree: "Supported" },
                        { feature: "Ordering", hash: "No Order", tree: "Maintains Order" },
                        { feature: "Memory Usage", hash: "Lower", tree: "Higher" },
                        { feature: "Collision Handling", hash: "Required", tree: "Not Applicable" },
                        { feature: "Best Use Case", hash: "Exact Match", tree: "Range & Exact Match" }
                    ]
                },
                options: [
                    "Hash indexes are always faster than tree indexes",
                    "Tree indexes support range queries while hash indexes don't",
                    "Hash indexes use more memory than tree indexes",
                    "Tree indexes don't maintain order"
                ],
                correct: 1,
                explanation: "Tree-based indexes maintain order and support range queries, while hash-based indexes are optimized for exact match queries with O(1) average time complexity."
            },
            {
                id: 7,
                type: "Multiple Choice",
                difficulty: "medium",
                question: "What is the main advantage of using an index on a frequently queried column?",
                options: [
                    "It reduces storage space",
                    "It eliminates the need for the original table",
                    "It significantly reduces query execution time",
                    "It automatically backs up the data"
                ],
                correct: 2,
                explanation: "The main advantage of indexing frequently queried columns is the significant reduction in query execution time by avoiding full table scans."
            },
            {
                id: 8,
                type: "Algorithm Analysis",
                difficulty: "medium",
                question: "What are the basic steps in a hash-based index lookup?",
                algorithmData: {
                    title: "Hash-based Index Lookup Algorithm",
                    steps: [
                        "Apply hash function to the search key",
                        "Calculate bucket/slot location",
                        "Access the bucket directly",
                        "Handle collisions if any",
                        "Return the record pointer or data"
                    ]
                },
                options: [
                    "Hash key → Access bucket → Return result",
                    "Hash key → Calculate location → Access bucket → Handle collisions → Return result",
                    "Search all buckets → Hash key → Return result",
                    "Hash key → Sort buckets → Access bucket → Return result"
                ],
                correct: 1,
                explanation: "Hash-based lookup involves: applying hash function, calculating bucket location, accessing bucket directly, handling collisions, and returning the result."
            },
            {
                id: 9,
                type: "Multiple Choice",
                difficulty: "easy",
                question: "What type of queries benefit most from tree-based indexes?",
                options: [
                    "Only exact match queries",
                    "Range queries and ordered results",
                    "Only insertion operations",
                    "Only deletion operations"
                ],
                correct: 1,
                explanation: "Tree-based indexes are particularly beneficial for range queries (e.g., WHERE age BETWEEN 20 AND 30) and when ordered results are needed."
            },
            {
                id: 10,
                type: "Performance Analysis",
                difficulty: "hard",
                question: "How does indexing affect database performance metrics?",
                performanceData: {
                    title: "Database Performance with Indexing",
                    metrics: [
                        { label: "SELECT Performance", value: "Much Faster", comparison: "O(log n) vs O(n)" },
                        { label: "INSERT Performance", value: "Slightly Slower", comparison: "Index maintenance overhead" },
                        { label: "UPDATE Performance", value: "Slightly Slower", comparison: "Index update required" },
                        { label: "DELETE Performance", value: "Slightly Slower", comparison: "Index cleanup required" },
                        { label: "Storage Space", value: "Increased", comparison: "Additional space for indexes" },
                        { label: "Memory Usage", value: "Increased", comparison: "Index structures in memory" }
                    ]
                },
                options: [
                    "Indexing always improves all operations",
                    "Indexing improves SELECT but may slow down INSERT/UPDATE/DELETE",
                    "Indexing only affects SELECT operations",
                    "Indexing has no impact on performance"
                ],
                correct: 1,
                explanation: "Indexing significantly improves SELECT performance but introduces overhead for INSERT, UPDATE, and DELETE operations due to index maintenance."
            },
            {
                id: 11,
                type: "SQL Analysis",
                difficulty: "medium",
                question: "Which SQL command would create an index on the 'author' column?",
                code: `-- Option A
CREATE INDEX idx_author ON books(author);

-- Option B  
CREATE TABLE books_index AS SELECT * FROM books;

-- Option C
ALTER TABLE books ADD INDEX author;

-- Option D
INDEX books ON author;`,
                options: [
                    "CREATE INDEX idx_author ON books(author);",
                    "CREATE TABLE books_index AS SELECT * FROM books;",
                    "ALTER TABLE books ADD INDEX author;",
                    "INDEX books ON author;"
                ],
                correct: 0,
                explanation: "The correct SQL syntax to create an index is: CREATE INDEX index_name ON table_name(column_name)."
            },
            {
                id: 12,
                type: "Multiple Choice",
                difficulty: "easy",
                question: "What is a composite index?",
                options: [
                    "An index on a single column",
                    "An index on multiple columns",
                    "An index that stores actual data",
                    "An index that cannot be modified"
                ],
                correct: 1,
                explanation: "A composite index is an index created on multiple columns, useful for queries that filter on multiple columns simultaneously."
            },
            {
                id: 13,
                type: "Data Structure Analysis",
                difficulty: "hard",
                question: "What is the structure of a B-tree index?",
                dataStructureData: {
                    title: "B-tree Index Structure",
                    structure: [
                        { name: "Root Node", type: "tree", description: "Top-level node with key ranges" },
                        { name: "Internal Nodes", type: "tree", description: "Intermediate nodes with keys and pointers" },
                        { name: "Leaf Nodes", type: "tree", description: "Bottom-level nodes with actual data pointers" },
                        { name: "Balanced Structure", type: "tree", description: "All leaf nodes at same level" }
                    ]
                },
                options: [
                    "Only root and leaf nodes",
                    "Root, internal nodes, and leaf nodes in a balanced structure",
                    "Linear structure like a linked list",
                    "Random structure with no specific organization"
                ],
                correct: 1,
                explanation: "A B-tree index has a balanced structure with root node, internal nodes, and leaf nodes, where all leaf nodes are at the same level."
            },
            {
                id: 14,
                type: "Multiple Choice",
                difficulty: "medium",
                question: "When should you NOT use an index?",
                options: [
                    "On frequently queried columns",
                    "On small tables with few records",
                    "On columns used in WHERE clauses",
                    "On columns used in ORDER BY clauses"
                ],
                correct: 1,
                explanation: "Indexes should not be used on small tables with few records as the overhead of maintaining the index may outweigh the benefits."
            },
            {
                id: 15,
                type: "Performance Analysis",
                difficulty: "medium",
                question: "What is the time complexity of different index operations?",
                performanceData: {
                    title: "Index Operation Time Complexities",
                    metrics: [
                        { label: "Hash Index Search", value: "O(1)", comparison: "Average case" },
                        { label: "B-tree Index Search", value: "O(log n)", comparison: "Worst case" },
                        { label: "Hash Index Insert", value: "O(1)", comparison: "Average case" },
                        { label: "B-tree Index Insert", value: "O(log n)", comparison: "Worst case" },
                        { label: "Linear Search (No Index)", value: "O(n)", comparison: "Must scan all records" }
                    ]
                },
                options: [
                    "All index operations are O(1)",
                    "Hash indexes are O(1) average, B-tree indexes are O(log n)",
                    "All index operations are O(log n)",
                    "Index operations have no predictable time complexity"
                ],
                correct: 1,
                explanation: "Hash indexes provide O(1) average case performance, while B-tree indexes provide O(log n) performance, both significantly better than O(n) linear search."
            },
            {
                id: 16,
                type: "Table Visualization",
                difficulty: "medium",
                question: "Given this table structure, which columns would benefit most from indexing?",
                tableData: {
                    title: "Employee Table",
                    headers: ["Employee_ID", "Name", "Department", "Salary", "Hire_Date", "Manager_ID"],
                    rows: [
                        ["1001", "John Doe", "Engineering", "75000", "2020-01-15", "1005"],
                        ["1002", "Jane Smith", "Marketing", "65000", "2019-03-22", "1006"],
                        ["1003", "Bob Johnson", "Sales", "55000", "2021-07-10", "1007"],
                        ["1004", "Alice Brown", "Engineering", "80000", "2018-11-05", "1005"],
                        ["1005", "Charlie Wilson", "Engineering", "95000", "2017-04-18", "NULL"]
                    ],
                    indexColumn: 0
                },
                options: [
                    "Only Employee_ID",
                    "Employee_ID and Department",
                    "Employee_ID, Department, and Manager_ID",
                    "All columns should be indexed"
                ],
                correct: 2,
                explanation: "Employee_ID (primary key), Department (frequently filtered), and Manager_ID (foreign key, frequently joined) would benefit most from indexing."
            },
            {
                id: 17,
                type: "Multiple Choice",
                difficulty: "easy",
                question: "What happens when you drop an index?",
                options: [
                    "The table data is deleted",
                    "The index structure is removed but table data remains",
                    "The database is corrupted",
                    "All queries stop working"
                ],
                correct: 1,
                explanation: "Dropping an index removes the index structure but leaves the table data intact. Queries will still work but may run slower without the index."
            },
            {
                id: 18,
                type: "Algorithm Analysis",
                difficulty: "hard",
                question: "What are the steps in a B-tree search algorithm?",
                algorithmData: {
                    title: "B-tree Search Algorithm",
                    steps: [
                        "Start at the root node",
                        "Compare search key with node keys",
                        "Follow appropriate child pointer",
                        "Repeat until leaf node is reached",
                        "Search within leaf node for exact match"
                    ]
                },
                options: [
                    "Start at root → Compare keys → Follow pointer → Repeat → Search leaf",
                    "Search all nodes randomly until found",
                    "Start at leaf → Move up to root",
                    "Use hash function to find location directly"
                ],
                correct: 0,
                explanation: "B-tree search starts at root, compares keys to determine the path, follows child pointers, and repeats until reaching the leaf node where the final search occurs."
            },
            {
                id: 19,
                type: "Multiple Choice",
                difficulty: "medium",
                question: "What is the primary trade-off when using database indexes?",
                options: [
                    "Faster queries vs. increased storage space and slower modifications",
                    "Better security vs. reduced performance",
                    "Simpler queries vs. complex table structure",
                    "Automatic backups vs. manual maintenance"
                ],
                correct: 0,
                explanation: "The primary trade-off is faster query performance versus increased storage space requirements and slower INSERT/UPDATE/DELETE operations."
            },
            {
                id: 20,
                type: "Index Comparison",
                difficulty: "hard",
                question: "Which index type would you choose for different query patterns?",
                indexComparisonData: {
                    title: "Index Type Selection by Query Pattern",
                    comparison: [
                        { feature: "Exact Match (WHERE id = 123)", hash: "✓ Optimal", tree: "✓ Good" },
                        { feature: "Range Query (WHERE age > 25)", hash: "✗ Not Supported", tree: "✓ Optimal" },
                        { feature: "Sorting (ORDER BY name)", hash: "✗ Not Supported", tree: "✓ Optimal" },
                        { feature: "Prefix Match (WHERE name LIKE 'John%')", hash: "✗ Limited", tree: "✓ Good" },
                        { feature: "Memory Usage", hash: "✓ Lower", tree: "✗ Higher" },
                        { feature: "Insertion Speed", hash: "✓ Faster", tree: "✗ Slower" }
                    ]
                },
                options: [
                    "Always use hash indexes for better performance",
                    "Always use tree indexes for better functionality",
                    "Use hash indexes for exact matches, tree indexes for ranges and sorting",
                    "The choice doesn't matter for performance"
                ],
                correct: 2,
                explanation: "Choose hash indexes for exact match queries (O(1) performance) and tree indexes for range queries, sorting, and prefix matching where order matters."
            }
        ];
    }

    startQuiz() {
        this.elements.totalQuestions.textContent = this.questions.length;
        this.showQuestion();
    }

    startTimer() {
        this.timer = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    showQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update question info
        this.elements.currentQuestion.textContent = this.currentQuestionIndex + 1;
        this.elements.questionType.textContent = question.type;
        this.elements.difficulty.textContent = question.difficulty;
        this.elements.difficulty.className = `difficulty ${question.difficulty}`;
        this.elements.questionText.textContent = question.question;
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.elements.progress.style.width = `${progress}%`;
        
        // Hide all displays
        this.hideAllDisplays();
        
        // Show specific displays based on question type
        this.showQuestionSpecificDisplays(question);
        
        // Show options
        this.showOptions(question);
        
        // Update navigation buttons
        this.elements.prevBtn.disabled = this.currentQuestionIndex === 0;
        this.elements.nextBtn.textContent = this.currentQuestionIndex === this.questions.length - 1 ? 'Finish' : 'Next';
    }

    hideAllDisplays() {
        this.elements.dataStructureDisplay.style.display = 'none';
        this.elements.indexComparison.style.display = 'none';
        this.elements.performanceDisplay.style.display = 'none';
        this.elements.tableVisualization.style.display = 'none';
        this.elements.algorithmDisplay.style.display = 'none';
        this.elements.codeBlock.style.display = 'none';
    }

    showQuestionSpecificDisplays(question) {
        if (question.dataStructureData) {
            this.showDataStructureDisplay(question.dataStructureData);
        }
        
        if (question.indexComparisonData) {
            this.showIndexComparison(question.indexComparisonData);
        }
        
        if (question.performanceData) {
            this.showPerformanceDisplay(question.performanceData);
        }
        
        if (question.tableData) {
            this.showTableVisualization(question.tableData);
        }
        
        if (question.algorithmData) {
            this.showAlgorithmDisplay(question.algorithmData);
        }
        
        if (question.code) {
            this.showCodeBlock(question.code);
        }
    }

    showDataStructureDisplay(data) {
        this.elements.dataStructureDisplay.style.display = 'block';
        this.elements.dataStructureDisplay.innerHTML = `
            <div class="data-structure-title">${data.title}</div>
            <div class="index-structure">
                ${data.structure.map((item, index) => `
                    <div class="structure-item ${item.type}">
                        <div class="structure-name">${item.name}</div>
                        <div class="structure-desc">${item.description}</div>
                    </div>
                    ${index < data.structure.length - 1 ? '<div class="structure-arrow">→</div>' : ''}
                `).join('')}
            </div>
        `;
    }

    showIndexComparison(data) {
        this.elements.indexComparison.style.display = 'block';
        this.elements.indexComparison.innerHTML = `
            <div class="comparison-title">${data.title}</div>
            <div class="comparison-table">
                <div class="comparison-header">Feature</div>
                <div class="comparison-header">Hash-based</div>
                <div class="comparison-header">Tree-based</div>
                ${data.comparison.map(item => `
                    <div class="comparison-cell">${item.feature}</div>
                    <div class="comparison-cell hash">${item.hash}</div>
                    <div class="comparison-cell tree">${item.tree}</div>
                `).join('')}
            </div>
        `;
    }

    showPerformanceDisplay(data) {
        this.elements.performanceDisplay.style.display = 'block';
        this.elements.performanceDisplay.innerHTML = `
            <div class="performance-title">${data.title}</div>
            <div class="performance-metrics">
                ${data.metrics.map(metric => `
                    <div class="metric-item">
                        <div class="metric-value">${metric.value}</div>
                        <div class="metric-label">${metric.label}</div>
                        <div class="metric-comparison">${metric.comparison}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showTableVisualization(data) {
        this.elements.tableVisualization.style.display = 'block';
        this.elements.tableVisualization.innerHTML = `
            <div class="table-title">${data.title}</div>
            <table class="data-table">
                <thead>
                    <tr>
                        ${data.headers.map((header, index) => `
                            <th class="${index === data.indexColumn ? 'index-highlight' : ''}">${header}</th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${data.rows.map(row => `
                        <tr>
                            ${row.map((cell, index) => `
                                <td class="${index === data.indexColumn ? 'index-highlight' : ''}">${cell}</td>
                            `).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    showAlgorithmDisplay(data) {
        this.elements.algorithmDisplay.style.display = 'block';
        this.elements.algorithmDisplay.innerHTML = `
            <div class="algorithm-title">${data.title}</div>
            <div class="algorithm-steps">
                ${data.steps.map((step, index) => `
                    <div class="algorithm-step">
                        <span class="step-number">${index + 1}</span>
                        <span class="step-description">${step}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showCodeBlock(code) {
        this.elements.codeBlock.style.display = 'block';
        this.elements.codeBlock.innerHTML = `<pre><code>${this.highlightSQL(code)}</code></pre>`;
    }

    highlightSQL(code) {
        return code
            .replace(/\b(CREATE|INDEX|TABLE|SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|ON|AS|ALTER|ADD|DROP)\b/g, '<span class="keyword">$1</span>')
            .replace(/\b(books|author|idx_author|books_index)\b/g, '<span class="string">$1</span>')
            .replace(/--.*$/gm, '<span class="comment">$&</span>')
            .replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
    }

    showOptions(question) {
        this.elements.optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = `
                <div class="option-text">${option}</div>
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
            `;
            
            optionElement.addEventListener('click', () => this.selectOption(index));
            
            // Show previous selection
            if (this.userAnswers[this.currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }
            
            this.elements.optionsContainer.appendChild(optionElement);
        });
    }

    selectOption(optionIndex) {
        // Remove previous selection
        this.elements.optionsContainer.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selection to clicked option
        this.elements.optionsContainer.children[optionIndex].classList.add('selected');
        
        // Store user answer
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showQuestion();
        } else {
            this.finishQuiz();
        }
    }

    finishQuiz() {
        clearInterval(this.timer);
        this.calculateScore();
        this.showResults();
    }

    calculateScore() {
        this.score = 0;
        this.questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correct) {
                this.score++;
            }
        });
    }

    showResults() {
        this.elements.quizContainer.style.display = 'none';
        this.elements.reviewContainer.style.display = 'none';
        this.elements.resultsContainer.style.display = 'block';
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const timeTaken = this.elements.timer.textContent;
        
        this.elements.finalScore.textContent = this.score;
        this.elements.finalTotal.textContent = this.questions.length;
        this.elements.scorePercentage.textContent = `${percentage}%`;
        this.elements.timeTaken.textContent = timeTaken;
        this.elements.correctCount.textContent = this.score;
        this.elements.incorrectCount.textContent = this.questions.length - this.score;
        
        // Update score percentage color
        if (percentage >= 80) {
            this.elements.scorePercentage.style.color = '#28a745';
        } else if (percentage >= 60) {
            this.elements.scorePercentage.style.color = '#ffc107';
        } else {
            this.elements.scorePercentage.style.color = '#dc3545';
        }
    }

    showReview() {
        this.elements.resultsContainer.style.display = 'none';
        this.elements.reviewContainer.style.display = 'block';
        
        this.elements.reviewQuestions.innerHTML = '';
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            
            const reviewElement = document.createElement('div');
            reviewElement.className = `review-question ${isCorrect ? 'correct' : 'incorrect'}`;
            reviewElement.innerHTML = `
                <div class="review-question-header">
                    <span class="review-question-number">Question ${index + 1}</span>
                    <span class="review-result ${isCorrect ? 'correct' : 'incorrect'}">
                        ${isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                </div>
                <div class="review-question-text">${question.question}</div>
                <div class="review-answer user-answer">
                    <span class="review-answer-label">Your Answer:</span>
                    ${userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
                </div>
                <div class="review-answer correct-answer">
                    <span class="review-answer-label">Correct Answer:</span>
                    ${question.options[question.correct]}
                </div>
                <div class="review-explanation">
                    <div class="review-explanation-title">Explanation:</div>
                    <div class="review-explanation-text">${question.explanation}</div>
                </div>
            `;
            
            this.elements.reviewQuestions.appendChild(reviewElement);
        });
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.startTime = Date.now();
        
        clearInterval(this.timer);
        this.startTimer();
        
        this.elements.resultsContainer.style.display = 'none';
        this.elements.reviewContainer.style.display = 'none';
        this.elements.quizContainer.style.display = 'block';
        this.elements.score.textContent = '0';
        
        this.showQuestion();
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DatabaseIndexingQuiz();
});
