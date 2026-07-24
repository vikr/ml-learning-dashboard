/*
 * curriculum.js — the topic catalog (mostly static).
 * Sourced from aman.ai/primers/ai and vinija.ai (recsys / concepts / nlp).
 *
 * Each topic:
 *   id         unique slug (kebab-case)
 *   title      display name
 *   category   one of MLDASH.categories
 *   source     "aman" | "vinija"
 *   url        full reading URL
 *   difficulty 1 = foundation, 2 = intermediate, 3 = advanced
 *   prereqs    array of topic ids that should ideally be mastered first
 *   tags       free-form keywords (used for search / grouping)
 *
 * To add a topic: append an object here. To reorder categories: edit
 * MLDASH.categories. The daily suggestion (see TUTOR.md) reads this + progress.js.
 */
window.MLDASH = window.MLDASH || {};

window.MLDASH.categories = [
  "Foundations",
  "Classical ML",
  "Deep Learning",
  "Transformers & LLMs",
  "LLM Training & Alignment",
  "Agents",
  "RecSys & Ranking",
  "Vision & Multimodal",
  "Reinforcement Learning",
  "Evaluation & MLOps",
  "Efficiency & Systems",
  "ML System Design Case Studies"
];

window.MLDASH.curriculum = [
  // ---------------- Foundations ----------------
  { id: "linear-logistic-regression", title: "Linear & Logistic Regression", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/linear-logistic-regression", difficulty: 1, prereqs: [], tags: ["regression", "basics"] },
  { id: "gradient-descent-and-backprop", title: "Gradient Descent & Backpropagation", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/gradient-descent-and-backprop", difficulty: 1, prereqs: ["linear-logistic-regression"], tags: ["optimization", "backprop"] },
  { id: "loss", title: "Loss Functions", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/loss", difficulty: 1, prereqs: [], tags: ["loss"] },
  { id: "activation-functions", title: "Activation Functions", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/activation-functions", difficulty: 1, prereqs: [], tags: ["activations"] },
  { id: "regularization", title: "Regularization", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/regularization", difficulty: 1, prereqs: ["gradient-descent-and-backprop"], tags: ["overfitting", "l1", "l2"] },
  { id: "bias-variance-tradeoff", title: "Bias–Variance Tradeoff", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/bias-variance-tradeoff", difficulty: 1, prereqs: [], tags: ["generalization"] },
  { id: "bayes-theorem", title: "Bayes' Theorem", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/bayes-theorem", difficulty: 1, prereqs: [], tags: ["probability"] },
  { id: "probability-calibration", title: "Probability Calibration", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/probability-calibration", difficulty: 2, prereqs: ["bayes-theorem"], tags: ["calibration"] },
  { id: "cross-validation", title: "k-Fold Cross Validation", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/cross-validation", difficulty: 1, prereqs: [], tags: ["validation"] },
  { id: "data-split", title: "Splitting Datasets", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/data-split", difficulty: 1, prereqs: [], tags: ["data"] },
  { id: "standardization-vs-normalization", title: "Standardization vs. Normalization", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/standardization-vs-normalization", difficulty: 1, prereqs: [], tags: ["preprocessing"] },
  { id: "double-descent", title: "Double Descent", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/double-descent", difficulty: 2, prereqs: ["bias-variance-tradeoff"], tags: ["generalization"] },
  { id: "multiclass-vs-multilabel", title: "Multiclass vs. Multilabel Classification", category: "Foundations", source: "aman", url: "https://aman.ai/primers/ai/multiclass-vs-multilabel-classification", difficulty: 1, prereqs: [], tags: ["classification"] },

  // ---------------- Classical ML ----------------
  { id: "k-nearest-neighbors", title: "k-Nearest Neighbors", category: "Classical ML", source: "aman", url: "https://aman.ai/primers/ai/k-nearest-neighbors", difficulty: 1, prereqs: [], tags: ["knn"] },
  { id: "clustering", title: "Clustering", category: "Classical ML", source: "aman", url: "https://aman.ai/primers/ai/clustering", difficulty: 1, prereqs: [], tags: ["kmeans", "unsupervised"] },
  { id: "support-vector-machines", title: "Support Vector Machines", category: "Classical ML", source: "aman", url: "https://aman.ai/primers/ai/support-vector-machines", difficulty: 2, prereqs: ["linear-logistic-regression"], tags: ["svm", "kernels"] },
  { id: "naive-bayes", title: "Naive Bayes", category: "Classical ML", source: "aman", url: "https://aman.ai/primers/ai/naive-bayes", difficulty: 1, prereqs: ["bayes-theorem"], tags: ["probabilistic"] },
  { id: "decision-trees-ensembles", title: "Decision Trees & Ensemble Methods", category: "Classical ML", source: "aman", url: "https://aman.ai/primers/ai/decision-trees-and-ensemble-methods", difficulty: 2, prereqs: [], tags: ["trees", "boosting", "gbdt", "lightgbm"] },
  { id: "ml-comp", title: "ML Algorithms — Comparative Analysis", category: "Classical ML", source: "aman", url: "https://aman.ai/primers/ai/ml-comp", difficulty: 2, prereqs: ["support-vector-machines", "decision-trees-ensembles"], tags: ["comparison"] },

  // ---------------- Deep Learning ----------------
  { id: "architectures", title: "Neural Architectures (Building Blocks)", category: "Deep Learning", source: "aman", url: "https://aman.ai/primers/ai/architectures", difficulty: 2, prereqs: ["gradient-descent-and-backprop"], tags: ["mlp", "architecture"] },
  { id: "cnn", title: "Convolutional Neural Networks", category: "Deep Learning", source: "aman", url: "https://aman.ai/primers/ai/cnn", difficulty: 2, prereqs: ["architectures"], tags: ["conv", "vision"] },
  { id: "batchnorm", title: "Batch Normalization", category: "Deep Learning", source: "aman", url: "https://aman.ai/primers/ai/batchnorm", difficulty: 2, prereqs: ["architectures"], tags: ["normalization"] },
  { id: "dropout", title: "Dropout", category: "Deep Learning", source: "aman", url: "https://aman.ai/primers/ai/dropout", difficulty: 2, prereqs: ["regularization"], tags: ["regularization"] },
  { id: "xavier-init", title: "Xavier Initialization", category: "Deep Learning", source: "aman", url: "https://aman.ai/primers/ai/xavier-init", difficulty: 2, prereqs: ["architectures"], tags: ["initialization"] },
  { id: "residual-connections", title: "Residual / Skip Connections", category: "Deep Learning", source: "aman", url: "https://aman.ai/primers/ai/residual-connections", difficulty: 2, prereqs: ["cnn"], tags: ["resnet"] },
  { id: "gan", title: "Generative Adversarial Networks", category: "Deep Learning", source: "aman", url: "https://aman.ai/primers/ai/gan", difficulty: 3, prereqs: ["cnn"], tags: ["generative"] },
  { id: "diffusion-models", title: "Diffusion Models", category: "Deep Learning", source: "aman", url: "https://aman.ai/primers/ai/diffusion-models", difficulty: 3, prereqs: ["gan"], tags: ["generative"] },
  { id: "gnn", title: "Graph Neural Networks", category: "Deep Learning", source: "aman", url: "https://aman.ai/primers/ai/gnn", difficulty: 3, prereqs: ["architectures"], tags: ["graphs"] },

  // ---------------- Transformers & LLMs ----------------
  { id: "embeddings", title: "Embeddings", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/embeddings", difficulty: 2, prereqs: ["architectures"], tags: ["embeddings", "word2vec"] },
  { id: "tokenizer", title: "Tokenization", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/tokenizer", difficulty: 2, prereqs: [], tags: ["bpe", "tokenization"] },
  { id: "attention", title: "Attention", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/attention", difficulty: 2, prereqs: ["embeddings"], tags: ["attention"] },
  { id: "transformers", title: "Transformers", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/transformers", difficulty: 3, prereqs: ["attention"], tags: ["transformer"] },
  { id: "encoder-vs-decoder", title: "Encoder vs. Decoder vs. Encoder-Decoder", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/encoder-vs-decoder-models", difficulty: 2, prereqs: ["transformers"], tags: ["bert", "gpt"] },
  { id: "LLM", title: "Overview of Large Language Models", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/LLM", difficulty: 3, prereqs: ["transformers"], tags: ["llm"] },
  { id: "mixture-of-experts", title: "Mixture-of-Experts (MoE)", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/mixture-of-experts", difficulty: 3, prereqs: ["transformers"], tags: ["moe", "scaling"] },
  { id: "token-sampling", title: "Token Sampling Methods", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/token-sampling", difficulty: 2, prereqs: ["LLM"], tags: ["decoding", "temperature"] },
  { id: "flashattention", title: "FlashAttention", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/flashattention", difficulty: 3, prereqs: ["transformers"], tags: ["efficiency", "attention"] },
  { id: "state-space-models", title: "State Space Models (Mamba)", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/state-space-models", difficulty: 3, prereqs: ["transformers"], tags: ["ssm", "mamba"] },
  { id: "context-length-extension", title: "LLM Context Length Extension", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/context-length-extension", difficulty: 3, prereqs: ["LLM"], tags: ["rope", "context"] },
  { id: "speculative-decoding", title: "Speculative Decoding", category: "Transformers & LLMs", source: "aman", url: "https://aman.ai/primers/ai/speculative-decoding", difficulty: 3, prereqs: ["LLM"], tags: ["inference", "efficiency"] },

  // ---------------- LLM Training & Alignment ----------------
  { id: "fine-tuning-models", title: "Fine-tuning Models", category: "LLM Training & Alignment", source: "aman", url: "https://aman.ai/primers/ai/fine-tuning-models", difficulty: 2, prereqs: ["LLM"], tags: ["finetuning"] },
  { id: "parameter-efficient-fine-tuning", title: "Parameter-Efficient Fine-Tuning (LoRA)", category: "LLM Training & Alignment", source: "aman", url: "https://aman.ai/primers/ai/parameter-efficient-fine-tuning", difficulty: 3, prereqs: ["fine-tuning-models"], tags: ["lora", "peft"] },
  { id: "preference-optimization", title: "Policy / Preference Optimization (RLHF, DPO)", category: "LLM Training & Alignment", source: "aman", url: "https://aman.ai/primers/ai/preference-optimization", difficulty: 3, prereqs: ["fine-tuning-models", "reinforcement-learning"], tags: ["rlhf", "dpo"] },
  { id: "llm-alignment", title: "LLM Alignment", category: "LLM Training & Alignment", source: "vinija", url: "https://vinija.ai/concepts/llm-alignment/", difficulty: 3, prereqs: ["preference-optimization"], tags: ["alignment"] },
  { id: "reinforcement-finetuning", title: "Reinforcement Fine-Tuning", category: "LLM Training & Alignment", source: "aman", url: "https://aman.ai/primers/ai/reinforcement-finetuning", difficulty: 3, prereqs: ["preference-optimization"], tags: ["rft"] },
  { id: "prompt-engineering", title: "Prompt Engineering", category: "LLM Training & Alignment", source: "aman", url: "https://aman.ai/primers/ai/prompt-engineering", difficulty: 2, prereqs: ["LLM"], tags: ["prompting", "cot"] },
  { id: "context-engineering", title: "Context Engineering", category: "LLM Training & Alignment", source: "aman", url: "https://aman.ai/primers/ai/context-engineering", difficulty: 2, prereqs: ["prompt-engineering"], tags: ["context"] },
  { id: "RAG", title: "Retrieval Augmented Generation (RAG)", category: "LLM Training & Alignment", source: "aman", url: "https://aman.ai/primers/ai/RAG", difficulty: 3, prereqs: ["LLM", "embeddings"], tags: ["rag", "retrieval"] },
  { id: "hallucination", title: "Hallucination Detection & Mitigation", category: "LLM Training & Alignment", source: "aman", url: "https://aman.ai/primers/ai/hallucination", difficulty: 3, prereqs: ["LLM"], tags: ["hallucination"] },
  { id: "reasoning-in-LLMs", title: "Reasoning in LLMs", category: "LLM Training & Alignment", source: "aman", url: "https://aman.ai/primers/ai/reasoning-in-LLMs", difficulty: 3, prereqs: ["prompt-engineering"], tags: ["reasoning", "cot"] },
  { id: "factuality-in-LLMs", title: "Factuality in LLMs", category: "LLM Training & Alignment", source: "aman", url: "https://aman.ai/primers/ai/factuality-in-LLMs", difficulty: 3, prereqs: ["hallucination"], tags: ["factuality"] },
  { id: "LLM-as-a-judge", title: "LLM-as-a-Judge / Autoraters", category: "LLM Training & Alignment", source: "aman", url: "https://aman.ai/primers/ai/LLM-as-a-judge", difficulty: 2, prereqs: ["LLM"], tags: ["evaluation"] },

  // ---------------- Agents ----------------
  { id: "agents", title: "Agents", category: "Agents", source: "aman", url: "https://aman.ai/primers/ai/agents", difficulty: 3, prereqs: ["LLM", "prompt-engineering"], tags: ["agents", "tools"] },
  { id: "agentic-design-patterns", title: "Agentic Design Patterns", category: "Agents", source: "aman", url: "https://aman.ai/primers/ai/agentic-design-patterns", difficulty: 3, prereqs: ["agents"], tags: ["patterns"] },
  { id: "agentic-RL", title: "Agentic Reinforcement Learning", category: "Agents", source: "aman", url: "https://aman.ai/primers/ai/agentic-RL", difficulty: 3, prereqs: ["agents", "reinforcement-learning"], tags: ["agentic-rl"] },
  { id: "agent-skills", title: "Agent Skills", category: "Agents", source: "aman", url: "https://aman.ai/primers/ai/agent-skills", difficulty: 3, prereqs: ["agents"], tags: ["skills"] },

  // ---------------- RecSys & Ranking (directly relevant to day-job) ----------------
  { id: "recsys-intro", title: "RecSys — Introduction", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/intro/", difficulty: 2, prereqs: [], tags: ["recsys"] },
  { id: "recsys-candidate-gen", title: "RecSys — Candidate Generation", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/candidate-gen/", difficulty: 2, prereqs: ["recsys-intro"], tags: ["retrieval", "candidate-generation"] },
  { id: "recsys-ranking", title: "RecSys — Ranking / Scoring", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/ranking/", difficulty: 3, prereqs: ["recsys-candidate-gen"], tags: ["ranking", "ltr", "lightgbm"] },
  { id: "recsys-re-ranking", title: "RecSys — Re-ranking", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/re-ranking/", difficulty: 3, prereqs: ["recsys-ranking"], tags: ["re-ranking", "diversity", "mmr"] },
  { id: "recsys-calibration", title: "RecSys — Calibration", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/callibration/", difficulty: 3, prereqs: ["recsys-ranking", "probability-calibration"], tags: ["calibration"] },
  { id: "recsys-architectures", title: "RecSys — Popular Architectures", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/architectures/", difficulty: 3, prereqs: ["recsys-ranking"], tags: ["two-tower", "dlrm", "wide-deep"] },
  { id: "recsys-metrics", title: "RecSys — Evaluation Metrics & Loss", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/metrics/", difficulty: 2, prereqs: ["recsys-intro"], tags: ["ndcg", "map", "metrics"] },
  { id: "recsys-cold-start", title: "RecSys — Cold Start Problem", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/cold-start/", difficulty: 2, prereqs: ["recsys-candidate-gen"], tags: ["cold-start"] },
  { id: "recsys-multi-armed-bandit", title: "RecSys — Multi-Armed Bandit", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/multi-armed-bandit/", difficulty: 3, prereqs: ["recsys-intro"], tags: ["bandit", "exploration"] },
  { id: "recsys-multi-objective", title: "RecSys — Multi-Objective Optimization", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/multi-objective-optimization/", difficulty: 3, prereqs: ["recsys-ranking"], tags: ["multi-objective"] },
  { id: "recsys-bias", title: "RecSys — Biases in Recommender Systems", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/bias/", difficulty: 3, prereqs: ["recsys-ranking"], tags: ["bias", "position-bias"] },
  { id: "recsys-transformer", title: "RecSys — Transformers for RecSys", category: "RecSys & Ranking", source: "vinija", url: "https://vinija.ai/recsys/transformer/", difficulty: 3, prereqs: ["recsys-ranking", "transformers"], tags: ["sasrec", "bert4rec"] },
  { id: "ann-similarity-search", title: "Approximate Nearest Neighbors — Similarity Search", category: "RecSys & Ranking", source: "aman", url: "https://aman.ai/primers/ai/ann-similarity-search", difficulty: 2, prereqs: ["embeddings"], tags: ["ann", "faiss", "hnsw"] },

  // ---------------- Vision & Multimodal ----------------
  { id: "vit", title: "Vision Transformer (ViT)", category: "Vision & Multimodal", source: "aman", url: "https://aman.ai/primers/ai/vit", difficulty: 3, prereqs: ["transformers", "cnn"], tags: ["vit", "vision"] },
  { id: "receptive-field", title: "Receptive Field", category: "Vision & Multimodal", source: "aman", url: "https://aman.ai/primers/ai/receptive-field", difficulty: 2, prereqs: ["cnn"], tags: ["cnn"] },
  { id: "CLIP", title: "CLIP", category: "Vision & Multimodal", source: "aman", url: "https://aman.ai/primers/ai/CLIP", difficulty: 3, prereqs: ["vit", "embeddings"], tags: ["clip", "contrastive"] },
  { id: "VLM", title: "Overview of Vision-Language Models", category: "Vision & Multimodal", source: "aman", url: "https://aman.ai/primers/ai/VLM", difficulty: 3, prereqs: ["CLIP", "LLM"], tags: ["vlm", "multimodal"] },
  { id: "vision-language-models", title: "VLM Architectures", category: "Vision & Multimodal", source: "aman", url: "https://aman.ai/primers/ai/vision-language-models", difficulty: 3, prereqs: ["VLM"], tags: ["vlm"] },

  // ---------------- Reinforcement Learning ----------------
  { id: "reinforcement-learning", title: "Reinforcement Learning", category: "Reinforcement Learning", source: "aman", url: "https://aman.ai/primers/ai/reinforcement-learning", difficulty: 3, prereqs: ["gradient-descent-and-backprop"], tags: ["rl", "q-learning", "policy-gradient"] },

  // ---------------- Evaluation & MLOps ----------------
  { id: "evaluation-metrics", title: "Evaluation Metrics", category: "Evaluation & MLOps", source: "aman", url: "https://aman.ai/primers/ai/evaluation-metrics", difficulty: 1, prereqs: [], tags: ["precision", "recall", "auc"] },
  { id: "benchmarks", title: "LLM / VLM Benchmarks", category: "Evaluation & MLOps", source: "aman", url: "https://aman.ai/primers/ai/benchmarks", difficulty: 2, prereqs: ["LLM"], tags: ["benchmarks"] },
  { id: "online-testing", title: "Online (A/B) Testing", category: "Evaluation & MLOps", source: "aman", url: "https://aman.ai/primers/ai/online-testing", difficulty: 2, prereqs: ["evaluation-metrics"], tags: ["ab-testing", "experiments"] },
  { id: "drift", title: "Data Drift", category: "Evaluation & MLOps", source: "aman", url: "https://aman.ai/primers/ai/drift", difficulty: 2, prereqs: ["evaluation-metrics"], tags: ["drift", "monitoring"] },
  { id: "mlops-tooling", title: "MLOps Tooling", category: "Evaluation & MLOps", source: "aman", url: "https://aman.ai/primers/ai/mlops-tooling", difficulty: 2, prereqs: [], tags: ["mlops"] },
  { id: "model-debugging", title: "Debugging Model Training", category: "Evaluation & MLOps", source: "aman", url: "https://aman.ai/primers/ai/model-debugging", difficulty: 2, prereqs: ["gradient-descent-and-backprop"], tags: ["debugging"] },

  // ---------------- Efficiency & Systems ----------------
  { id: "distributed-training-parallelism", title: "Distributed Training Parallelism", category: "Efficiency & Systems", source: "aman", url: "https://aman.ai/primers/ai/distributed-training-parallelism", difficulty: 3, prereqs: ["transformers"], tags: ["ddp", "fsdp", "parallelism"] },
  { id: "grad-accum-checkpoint", title: "Gradient Accumulation & Checkpointing", category: "Efficiency & Systems", source: "aman", url: "https://aman.ai/primers/ai/grad-accum-checkpoint", difficulty: 2, prereqs: ["gradient-descent-and-backprop"], tags: ["memory"] },
  { id: "model-compression", title: "Model Compression", category: "Efficiency & Systems", source: "aman", url: "https://aman.ai/primers/ai/model-compression", difficulty: 3, prereqs: ["architectures"], tags: ["quantization", "pruning", "distillation"] },
  { id: "model-acceleration", title: "Model Acceleration", category: "Efficiency & Systems", source: "aman", url: "https://aman.ai/primers/ai/model-acceleration", difficulty: 3, prereqs: ["model-compression"], tags: ["inference", "speedup"] },
  { id: "gpu-architecture", title: "GPU Architecture", category: "Efficiency & Systems", source: "aman", url: "https://aman.ai/primers/ai/gpu-architecture", difficulty: 2, prereqs: [], tags: ["gpu", "cuda"] },

  // ---------------- ML System Design Case Studies ----------------
  // Curated applied case studies from mallahyari/ml-practical-usecases (Evidently AI's 650-case DB),
  // chosen for direct relevance to keyword serving / ranking / ads / bandits. Reading = company eng blog.
  // Retrieval / Two-Tower / ANN
  { id: "cs-airbnb-ebr-search", title: "Airbnb — Embedding-Based Retrieval for Search", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/airbnb-engineering/embedding-based-retrieval-for-airbnb-search-aabebfc85839", difficulty: 3, prereqs: ["embeddings", "ann-similarity-search", "recsys-candidate-gen"], tags: ["two-tower", "retrieval", "search", "airbnb"] },
  { id: "cs-pinterest-ebr-homefeed", title: "Pinterest — Embedding-Based Retrieval at Homefeed", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/pinterest-engineering/advancements-in-embedding-based-retrieval-at-pinterest-homefeed-d7d7971a409e", difficulty: 3, prereqs: ["embeddings", "recsys-candidate-gen", "recsys-architectures"], tags: ["retrieval", "homefeed", "pinterest"] },
  { id: "cs-snap-two-tower-spotlight", title: "Snap — Two-Tower Embedding Retrieval in Spotlight", category: "ML System Design Case Studies", source: "casestudy", url: "https://eng.snap.com/embedding-based-retrieval", difficulty: 3, prereqs: ["recsys-architectures", "embeddings"], tags: ["two-tower", "retrieval", "snap"] },
  { id: "cs-expedia-two-tower-candgen", title: "Expedia — Two-Tower Candidate Generation", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/expedia-group-tech/candidate-generation-using-a-two-tower-approach-with-expedia-group-traveler-data-ca6a0dcab83e", difficulty: 3, prereqs: ["recsys-candidate-gen", "recsys-architectures"], tags: ["two-tower", "candidate-generation", "expedia"] },
  { id: "cs-pinterest-ann-ads", title: "Pinterest — Offline ANN for Ad Retrieval", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/pinterest-engineering/unlocking-efficient-ad-retrieval-offline-approximate-nearest-neighbors-in-pinterest-ads-6fccc131ac14", difficulty: 3, prereqs: ["ann-similarity-search", "embeddings"], tags: ["ann", "ads", "retrieval", "pinterest"] },
  { id: "cs-instacart-embeddings-search", title: "Instacart — Embeddings for Search Relevance", category: "ML System Design Case Studies", source: "casestudy", url: "https://tech.instacart.com/how-instacart-uses-embeddings-to-improve-search-relevance-e569839c3c36", difficulty: 2, prereqs: ["embeddings"], tags: ["search", "embeddings", "instacart"] },
  // Ranking / Learning-to-Rank
  { id: "cs-etsy-dl-search-ranking", title: "Etsy — Deep Learning for Search Ranking", category: "ML System Design Case Studies", source: "casestudy", url: "https://www.etsy.com/uk/codeascraft/deep-learning-for-search-ranking-at-etsy", difficulty: 3, prereqs: ["recsys-ranking"], tags: ["ltr", "ranking", "etsy"] },
  { id: "cs-airbnb-dl-ranking-stays", title: "Airbnb — Deep Learning for Ranking Stays", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/airbnb-engineering/improving-deep-learning-for-ranking-stays-at-airbnb-959097638bde", difficulty: 3, prereqs: ["recsys-ranking", "recsys-metrics"], tags: ["ltr", "ranking", "airbnb"] },
  { id: "cs-pinterest-prerank", title: "Pinterest — Modernizing Home Feed Pre-Ranking", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/pinterest-engineering/modernizing-home-feed-pre-ranking-stage-e636c9cdc36b", difficulty: 3, prereqs: ["recsys-ranking", "recsys-candidate-gen"], tags: ["pre-ranking", "multi-stage", "pinterest"] },
  { id: "cs-glassdoor-multistage", title: "Glassdoor — Multi-Stage Recommendation System", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/glassdoor-engineering/inside-glassdoors-multi-stage-recommendation-system-cee58b52a75a", difficulty: 3, prereqs: ["recsys-candidate-gen", "recsys-ranking", "recsys-re-ranking"], tags: ["multi-stage", "glassdoor"] },
  { id: "cs-etsy-multitask-ranker", title: "Etsy — Multi-Task Canonical Ranker", category: "ML System Design Case Studies", source: "casestudy", url: "https://www.etsy.com/uk/codeascraft/how-we-built-a-multi-task-canonical-ranker-for-recommendations-at-etsy", difficulty: 3, prereqs: ["recsys-ranking", "recsys-multi-objective"], tags: ["multi-task", "ranking", "etsy"] },
  { id: "cs-linkedin-ctr-dl", title: "LinkedIn — Lessons Building a Deep-Learning Ads CTR Model", category: "ML System Design Case Studies", source: "casestudy", url: "https://engineering.linkedin.com/blog/2022/challenges-and-practical-lessons-from-building-a-deep-learning-b", difficulty: 3, prereqs: ["recsys-ranking"], tags: ["ctr", "ads", "linkedin"] },
  { id: "cs-snap-ad-ranking", title: "Snap — ML for Snapchat Ad Ranking", category: "ML System Design Case Studies", source: "casestudy", url: "https://eng.snap.com/machine-learning-snap-ad-ranking", difficulty: 3, prereqs: ["recsys-ranking"], tags: ["ads", "ctr", "snap"] },
  // Ads / Conversion / Bidding
  { id: "cs-pinterest-ads-conversion", title: "Pinterest — Evolution of Ads Conversion Optimization Models", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/pinterest-engineering/evolution-of-ads-conversion-optimization-models-at-pinterest-84b244043d51", difficulty: 3, prereqs: ["recsys-ranking"], tags: ["ads", "conversion", "cvr", "pinterest"] },
  { id: "cs-pinterest-online-offline", title: "Pinterest — Online-Offline Discrepancy in Ads Ranking", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/pinterest-engineering/handling-online-offline-discrepancy-in-pinterest-ads-ranking-system-8fd662da4c2d", difficulty: 3, prereqs: ["recsys-ranking", "recsys-calibration"], tags: ["calibration", "online-offline", "ads", "pinterest"] },
  { id: "cs-meta-sequence-ads", title: "Meta — Sequence Learning for Personalized Ads", category: "ML System Design Case Studies", source: "casestudy", url: "https://engineering.fb.com/2024/11/19/data-infrastructure/sequence-learning-personalized-ads-recommendations/", difficulty: 3, prereqs: ["recsys-ranking", "transformers"], tags: ["sequence", "ads", "meta"] },
  { id: "cs-canva-keyword-bidding", title: "Canva — End-to-End Keyword Bidding for Apple Search Ads", category: "ML System Design Case Studies", source: "casestudy", url: "https://www.canva.dev/blog/engineering/end-to-end-asa-keyword-bidding/", difficulty: 3, prereqs: ["recsys-ranking", "reinforcement-learning"], tags: ["bidding", "keywords", "ads", "canva"] },
  // Bandits / Exploration
  { id: "cs-doordash-explore-exploit", title: "DoorDash — Homepage Recs with Exploitation & Exploration", category: "ML System Design Case Studies", source: "casestudy", url: "https://doordash.engineering/2022/10/05/homepage-recommendation-with-exploitation-and-exploration/", difficulty: 3, prereqs: ["recsys-multi-armed-bandit"], tags: ["bandit", "exploration", "doordash"] },
  { id: "cs-instacart-contextual-bandits", title: "Instacart — Contextual Bandits in Large Action Spaces", category: "ML System Design Case Studies", source: "casestudy", url: "https://tech.instacart.com/using-contextual-bandit-models-in-large-action-spaces-at-instacart-cb7ab4d8fa4f", difficulty: 3, prereqs: ["recsys-multi-armed-bandit"], tags: ["contextual-bandit", "exploration", "instacart"] },
  { id: "cs-trivago-explore-exploit-ranking", title: "Trivago — Explore-Exploit Dilemma in Ranking", category: "ML System Design Case Studies", source: "casestudy", url: "https://tech.trivago.com/post/2022-11-04-explore-exploit-dilemma-in-ranking-model", difficulty: 3, prereqs: ["recsys-multi-armed-bandit", "recsys-ranking"], tags: ["bandit", "ranking", "trivago"] },
  { id: "cs-expedia-cascade-bandits", title: "Expedia — Optimizing Rankings with Cascade Bandits", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/expedia-group-tech/how-to-optimise-rankings-with-cascade-bandits-5d92dfa0f16b", difficulty: 3, prereqs: ["recsys-multi-armed-bandit", "recsys-ranking", "recsys-bias"], tags: ["cascade-bandit", "ranking", "expedia"] },
  // Diversity / Re-ranking
  { id: "cs-airbnb-ltr-diversely", title: "Airbnb — Learning To Rank Diversely", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/airbnb-engineering/learning-to-rank-diversely-add6b1929621", difficulty: 3, prereqs: ["recsys-re-ranking"], tags: ["diversity", "re-ranking", "airbnb"] },
  { id: "cs-dailymotion-diversity", title: "Dailymotion — Video Feed Recs with Diversity", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/dailymotion/optimizing-video-feed-recommendations-with-diversity-machine-learning-first-steps-4cf9abdbbffd", difficulty: 2, prereqs: ["recsys-re-ranking"], tags: ["diversity", "re-ranking", "dailymotion"] },
  // Cold-Start
  { id: "cs-deliveryhero-coldstart-ranking", title: "Delivery Hero — Ranking Restaurants for New Users", category: "ML System Design Case Studies", source: "casestudy", url: "https://tech.deliveryhero.com/personalisation-delivery-hero-ranking-restaurants-for-new-users/", difficulty: 2, prereqs: ["recsys-cold-start"], tags: ["cold-start", "ranking", "deliveryhero"] },
  { id: "cs-gousto-coldstart-recipes", title: "Gousto — Cold-Start in Recipe Recommendation", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/gousto-engineering-techbrunch/gousto-r-series-vol-2-tackling-the-cold-start-problem-in-recipe-recommendation-engine-af92a434805f", difficulty: 2, prereqs: ["recsys-cold-start"], tags: ["cold-start", "gousto"] },
  // Search Relevance with LLMs
  { id: "cs-pinterest-search-llm", title: "Pinterest — Improving Search Relevance Using LLMs", category: "ML System Design Case Studies", source: "casestudy", url: "https://medium.com/pinterest-engineering/improving-pinterest-search-relevance-using-large-language-models-4cd938d4e892", difficulty: 3, prereqs: ["recsys-ranking", "LLM"], tags: ["search", "llm", "relevance", "pinterest"] }
];
