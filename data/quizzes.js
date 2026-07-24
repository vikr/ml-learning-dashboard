/*
 * quizzes.js — the quiz bank, keyed by curriculum topic id.
 * Powers the in-dashboard "Quiz" button. Full coverage of all curriculum topics.
 * Concept topics sourced from aman.ai / vinija.ai; MCQ answer keys validated.
 * "cs-*" topics ("ML System Design Case Studies" category) are grounded in the
 * linked company engineering blogs (curated from mallahyari/ml-practical-usecases).
 *
 * Per topic:
 *   mcq:   [ { q, options: [..], answer: <index>, explain, tag } ]
 *   short: [ { q, model, points: [..], tag } ]   // self-graded in the dashboard
 *
 * Scoring (see index.html): each MCQ = 1 point; each short-answer = 2 points
 * (self-graded got-it=1 / partial=0.5 / missed=0). Score = earned/possible * 100.
 * To add/adjust: edit the object below (keep it valid JSON-style JS).
 */
window.MLDASH = window.MLDASH || {};

window.MLDASH.quizzes = {
  "linear-logistic-regression": {
    "mcq": [
      {
        "q": "In logistic regression, what does the sigmoid output σ(wᵀx + b) represent?",
        "options": [
          "The raw log-odds of the positive class",
          "The estimated probability of the positive class",
          "The signed distance to the decision boundary",
          "The class label directly (0 or 1)"
        ],
        "answer": 1,
        "tag": "sigmoid / probability",
        "explain": "The linear term wᵀx+b is the log-odds; the sigmoid squashes it into a probability in (0,1)."
      },
      {
        "q": "Which loss is standard for training logistic regression?",
        "options": [
          "Mean squared error",
          "Hinge loss",
          "Binary cross-entropy (log-loss)",
          "Mean absolute error"
        ],
        "answer": 2,
        "tag": "loss function",
        "explain": "Log-loss is the negative log-likelihood of the Bernoulli model and is convex in the parameters."
      },
      {
        "q": "Why is MSE usually avoided as the logistic-regression objective?",
        "options": [
          "It is undefined for probabilities",
          "Combined with the sigmoid it is non-convex and gives vanishing gradients when confidently wrong",
          "It cannot be minimized by gradient descent",
          "It always overfits"
        ],
        "answer": 1,
        "tag": "why not MSE",
        "explain": "MSE∘sigmoid is non-convex and its gradient shrinks when predictions are confidently wrong; log-loss stays convex with well-behaved gradients."
      },
      {
        "q": "A logistic-regression coefficient wⱼ = 0.7 means that a one-unit increase in feature xⱼ (others fixed) multiplies the odds by roughly…",
        "options": [
          "0.7",
          "e^0.7 ≈ 2.0",
          "1.7",
          "log(0.7)"
        ],
        "answer": 1,
        "tag": "odds interpretation",
        "explain": "Coefficients are additive in log-odds, so they are multiplicative in odds: the odds ratio is e^wⱼ."
      }
    ],
    "short": [
      {
        "q": "Explain the shape of the logistic-regression decision boundary and why the model is still called 'linear'.",
        "model": "The predicted probability is nonlinear (sigmoid), but the decision boundary — the set where p = 0.5, i.e. wᵀx + b = 0 — is a hyperplane, linear in x. 'Linear' refers to the linear predictor / boundary, not the output.",
        "points": [
          "boundary is where wᵀx+b = 0 (p = 0.5)",
          "that set is a hyperplane → linear in features",
          "nonlinearity is only in the sigmoid link, not the boundary"
        ],
        "tag": "decision boundary"
      }
    ]
  },
  "gradient-descent-and-backprop": {
    "mcq": [
      {
        "q": "What does backpropagation compute?",
        "options": [
          "The loss function value",
          "Gradients of the loss w.r.t. each weight via chain rule",
          "The optimal learning rate",
          "The global minimum directly"
        ],
        "answer": 1,
        "explain": "Backprop applies the chain rule backward through the network to compute ∂L/∂w for every weight, which are then used by the optimizer.",
        "tag": "chain rule"
      },
      {
        "q": "Why use mini-batch gradient descent instead of full-batch gradient descent for large datasets?",
        "options": [
          "It guarantees convergence to global minimum",
          "It eliminates the need for a learning rate",
          "It reduces memory/compute per step while providing a noisier but faster-to-compute gradient estimate",
          "It removes the vanishing gradient problem"
        ],
        "answer": 2,
        "explain": "Mini-batches trade a noisier gradient estimate for much lower per-step memory and compute cost, enabling more frequent updates.",
        "tag": "mini-batch vs batch GD"
      },
      {
        "q": "What primarily causes the vanishing gradient problem in deep networks using sigmoid/tanh activations?",
        "options": [
          "Too many parameters",
          "High learning rate",
          "Insufficient data",
          "Repeated multiplication of small activation-function derivatives across layers shrinking gradient magnitude"
        ],
        "answer": 3,
        "explain": "Sigmoid/tanh derivatives are small (≤0.25 or ≤1) and saturate; multiplying many small numbers across layers during backprop shrinks the gradient toward zero.",
        "tag": "vanishing gradients"
      },
      {
        "q": "What is the purpose of momentum in gradient descent optimizers?",
        "options": [
          "To accumulate a moving average of past gradients to smooth updates and accelerate convergence through ravines",
          "To increase the learning rate over time",
          "To compute second-order derivatives",
          "To reduce the number of parameters"
        ],
        "answer": 0,
        "explain": "Momentum accumulates an exponentially-weighted average of past gradients, damping oscillations and speeding convergence along consistent directions.",
        "tag": "momentum optimization"
      }
    ],
    "short": [
      {
        "q": "Explain how backpropagation uses the chain rule to update weights in a neural network.",
        "model": "Backprop computes the gradient of the loss w.r.t. each weight by applying the chain rule backward from the output layer, reusing intermediate local derivatives computed at each layer. These gradients are then used by an optimizer (e.g., SGD) to update weights via w := w - η∇L. This avoids redundant computation by caching forward-pass activations and propagating error signals backward layer by layer.",
        "points": [
          "chain rule composes local derivatives layer by layer",
          "forward pass caches activations needed for backward pass",
          "gradients used in update rule w -= η∇L"
        ],
        "tag": "backpropagation mechanics"
      }
    ]
  },
  "loss": {
    "mcq": [
      {
        "q": "Which loss function is standard for multi-class classification with a softmax output?",
        "options": [
          "Mean Squared Error",
          "Binary cross-entropy",
          "Categorical cross-entropy",
          "Hinge loss"
        ],
        "answer": 2,
        "explain": "Categorical cross-entropy compares the softmax probability distribution against the one-hot true label across all mutually exclusive classes.",
        "tag": "cross-entropy loss"
      },
      {
        "q": "Why does cross-entropy loss pair better with sigmoid/softmax outputs than MSE for classification?",
        "options": [
          "Cross-entropy is always lower in value",
          "Cross-entropy's gradient doesn't vanish when the prediction is confidently wrong, unlike MSE combined with sigmoid saturation",
          "Cross-entropy doesn't require labels",
          "MSE cannot output probabilities"
        ],
        "answer": 1,
        "explain": "When MSE is combined with a saturated sigmoid, the gradient shrinks even for badly wrong predictions; cross-entropy's gradient stays large in that case, speeding learning.",
        "tag": "MSE vs cross-entropy"
      },
      {
        "q": "What is the key property of Huber loss compared to MSE?",
        "options": [
          "It penalizes large errors more heavily than MSE",
          "It is only defined for classification",
          "It is non-differentiable everywhere",
          "It behaves like MSE for small errors and like MAE (linear) for large errors, making it more robust to outliers"
        ],
        "answer": 3,
        "explain": "Huber loss is quadratic near zero error and linear beyond a threshold, so large outlier errors contribute linearly rather than quadratically, reducing their influence.",
        "tag": "Huber loss / robustness"
      },
      {
        "q": "In a highly imbalanced binary classification problem, what is a common loss-function-level remedy?",
        "options": [
          "Use class-weighted (or focal) cross-entropy to up-weight the minority class / down-weight easy negatives",
          "Switch to MSE loss",
          "Remove the loss function entirely and use accuracy",
          "Increase the learning rate"
        ],
        "answer": 0,
        "explain": "Weighting the loss (or using focal loss's easy-example down-weighting) counteracts the majority class dominating the aggregate loss signal.",
        "tag": "class imbalance handling"
      }
    ],
    "short": [
      {
        "q": "Why might you choose focal loss over standard cross-entropy for an object detection task?",
        "model": "Focal loss adds a modulating factor (1-p_t)^γ to cross-entropy that down-weights the loss contribution of well-classified (easy) examples, focusing training on hard, misclassified examples. This is especially useful in object detection where background/easy negatives vastly outnumber foreground/hard positives, since standard cross-entropy would be dominated by the easy examples' aggregate loss.",
        "points": [
          "down-weights easy examples via (1-p_t)^γ",
          "addresses foreground-background class imbalance",
          "focuses gradient signal on hard examples"
        ],
        "tag": "focal loss / class imbalance"
      }
    ]
  },
  "activation-functions": {
    "mcq": [
      {
        "q": "Why is ReLU preferred over sigmoid in deep hidden layers?",
        "options": [
          "ReLU output is bounded between 0 and 1",
          "ReLU avoids vanishing gradients for positive inputs since its derivative is 1, and is cheaper to compute",
          "ReLU is smooth everywhere",
          "ReLU always produces zero-centered outputs"
        ],
        "answer": 1,
        "explain": "ReLU's derivative is exactly 1 for positive inputs (no saturation) and it's a simple max(0,x), making it both gradient-friendly and computationally cheap.",
        "tag": "ReLU vs sigmoid"
      },
      {
        "q": "What is the \"dying ReLU\" problem?",
        "options": [
          "ReLU units get stuck outputting 0 for all inputs because their gradient is 0 for negative pre-activations, so weights stop updating",
          "ReLU causes exploding gradients",
          "ReLU cannot be used with batch normalization",
          "ReLU outputs become negative infinity"
        ],
        "answer": 0,
        "explain": "If a unit's pre-activation stays negative, its gradient is 0, so it never receives an update and permanently outputs 0.",
        "tag": "dying ReLU"
      },
      {
        "q": "Why use Leaky ReLU or ELU instead of standard ReLU?",
        "options": [
          "They remove the need for weight initialization",
          "They are computationally cheaper than ReLU",
          "They allow a small non-zero gradient for negative inputs, mitigating the dying ReLU problem",
          "They bound the output between -1 and 1 like tanh"
        ],
        "answer": 2,
        "explain": "Leaky ReLU/ELU give a small (or exponential) non-zero slope for negative inputs so units can still receive gradient signal and recover.",
        "tag": "Leaky ReLU / ELU"
      },
      {
        "q": "Why is softmax used in the output layer for multi-class classification instead of applying sigmoid to each logit independently?",
        "options": [
          "Softmax is faster to compute",
          "Softmax removes the need for cross-entropy loss",
          "Softmax guarantees zero training error",
          "Softmax normalizes exponentiated logits into a probability distribution that sums to 1 across mutually exclusive classes, unlike independent sigmoids"
        ],
        "answer": 3,
        "explain": "Softmax couples all class scores together so they form a valid probability distribution summing to 1, appropriate when classes are mutually exclusive.",
        "tag": "softmax for multiclass"
      }
    ],
    "short": [
      {
        "q": "Explain the vanishing gradient problem in the context of sigmoid/tanh activations and how ReLU-family activations mitigate it.",
        "model": "Sigmoid and tanh squash inputs into a narrow output range and have derivatives that are at most 0.25 (sigmoid) or 1 (tanh), approaching zero when inputs are large in magnitude (saturation). In deep networks, backprop multiplies these small derivatives across many layers, causing gradients to shrink exponentially toward the input layers, so early layers learn very slowly. ReLU's derivative is exactly 1 for all positive inputs, so gradients pass through unattenuated in the active region, greatly reducing vanishing gradients (though it introduces the dying ReLU issue instead).",
        "points": [
          "sigmoid/tanh derivatives saturate near 0 for large |x|",
          "chain rule multiplies small derivatives across layers, shrinking gradient",
          "ReLU has derivative 1 for x>0, avoiding this attenuation"
        ],
        "tag": "vanishing gradients & activation choice"
      }
    ]
  },
  "regularization": {
    "mcq": [
      {
        "q": "What is the primary effect of L1 regularization on model weights?",
        "options": [
          "It shrinks weights toward zero smoothly without ever reaching exactly zero",
          "It encourages sparsity by driving many weights to exactly zero",
          "It only affects the bias term",
          "It increases model variance"
        ],
        "answer": 1,
        "explain": "The L1 penalty's constant-magnitude subgradient pushes small weights all the way to zero, producing sparse solutions useful for feature selection.",
        "tag": "L1 vs L2 regularization"
      },
      {
        "q": "How does L2 regularization differ from L1 in its effect on weights?",
        "options": [
          "L2 also produces sparse solutions like L1",
          "L2 has no closed-form gradient",
          "L2 shrinks all weights proportionally toward zero without typically forcing them to exactly zero, unlike L1's sparsity-inducing effect",
          "L2 only works with linear regression"
        ],
        "answer": 2,
        "explain": "L2's penalty gradient is proportional to the weight itself, so it shrinks weights smoothly and rarely drives them to exactly zero.",
        "tag": "L1 vs L2 regularization"
      },
      {
        "q": "What problem does dropout address, and how?",
        "options": [
          "It increases the learning rate dynamically",
          "It replaces the need for a validation set",
          "It reduces training time by removing layers permanently",
          "It reduces overfitting by randomly zeroing a fraction of neuron activations during training, preventing co-adaptation"
        ],
        "answer": 3,
        "explain": "Randomly zeroing activations each training step prevents units from co-adapting and approximates averaging over many sub-networks, reducing overfitting.",
        "tag": "dropout"
      },
      {
        "q": "What does early stopping regularize against?",
        "options": [
          "Overfitting — training is halted once validation loss stops improving, before the model over-fits the training set",
          "Underfitting by extending training indefinitely",
          "The choice of activation function",
          "The batch size"
        ],
        "answer": 0,
        "explain": "Early stopping monitors validation loss and halts training at the point before the model begins to fit noise in the training data.",
        "tag": "early stopping"
      }
    ],
    "short": [
      {
        "q": "Compare L1 and L2 regularization in terms of the solutions they produce and when you'd prefer one over the other.",
        "model": "L1 (Lasso) adds the sum of absolute weight values to the loss, which produces sparse solutions by driving many weights exactly to zero — useful for feature selection or when you believe only a subset of features matter. L2 (Ridge) adds the sum of squared weights, shrinking all weights smoothly toward zero without eliminating them, which is preferable when most features are believed to be relevant but you want to control multicollinearity and reduce variance. Elastic Net combines both to get sparsity plus stability.",
        "points": [
          "L1 induces sparsity (feature selection)",
          "L2 shrinks weights smoothly, handles multicollinearity",
          "choice depends on whether sparse feature selection is desired"
        ],
        "tag": "L1 vs L2 regularization"
      }
    ]
  },
  "bias-variance-tradeoff": {
    "mcq": [
      {
        "q": "What does high bias in a model typically indicate?",
        "options": [
          "The model is too complex and overfits",
          "The model is too simple and underfits, missing relevant patterns in the data",
          "The model has too many parameters",
          "The model has zero training error"
        ],
        "answer": 1,
        "explain": "High bias comes from overly restrictive model assumptions that fail to capture the underlying pattern, i.e. underfitting.",
        "tag": "bias vs underfitting"
      },
      {
        "q": "What does high variance in a model typically indicate?",
        "options": [
          "The model underfits and has high training error",
          "The model is insensitive to the training data",
          "The model fits the training data very well but generalizes poorly, being overly sensitive to fluctuations in the training set",
          "The model has too few parameters"
        ],
        "answer": 2,
        "explain": "High variance means small changes in the training data lead to large changes in the learned model, a hallmark of overfitting.",
        "tag": "variance vs overfitting"
      },
      {
        "q": "Which of these is a typical remedy for high variance (overfitting)?",
        "options": [
          "Increasing model complexity",
          "Removing regularization",
          "Reducing training data",
          "Adding regularization, gathering more training data, or reducing model complexity"
        ],
        "answer": 3,
        "explain": "Regularization, more data, and simpler models all constrain the model's ability to fit noise, directly reducing variance.",
        "tag": "reducing overfitting"
      },
      {
        "q": "How does increasing model complexity typically affect the bias-variance tradeoff?",
        "options": [
          "It decreases bias but tends to increase variance",
          "It decreases both bias and variance",
          "It increases bias but decreases variance",
          "It has no effect on either"
        ],
        "answer": 0,
        "explain": "More complex models can fit the training data more closely (lower bias) but become more sensitive to the specific training sample (higher variance).",
        "tag": "complexity vs bias/variance"
      }
    ],
    "short": [
      {
        "q": "Explain the bias-variance tradeoff and how it relates to total expected error of a model.",
        "model": "Expected prediction error decomposes into bias² + variance + irreducible noise. Bias is error from overly simplistic assumptions (underfitting), while variance is error from sensitivity to the specific training sample (overfitting). Increasing model complexity typically reduces bias but increases variance, so the goal is to find the sweet spot that minimizes total error, often via regularization, cross-validation, or ensembling.",
        "points": [
          "error = bias² + variance + irreducible noise",
          "simple models: high bias/low variance; complex models: low bias/high variance",
          "goal is minimizing total error, not either term alone"
        ],
        "tag": "bias-variance decomposition"
      }
    ]
  },
  "bayes-theorem": {
    "mcq": [
      {
        "q": "Bayes' theorem states P(A|B) equals what?",
        "options": [
          "P(A)P(B)",
          "P(B|A)P(A) / P(B)",
          "P(A)/P(B)",
          "P(A|B)P(B)/P(A)"
        ],
        "answer": 1,
        "explain": "Bayes' theorem: posterior = likelihood × prior / evidence, i.e. P(A|B) = P(B|A)P(A)/P(B).",
        "tag": "Bayes' rule formula"
      },
      {
        "q": "In Bayesian terms, what is the \"posterior\"?",
        "options": [
          "The updated belief about a hypothesis after observing evidence, P(hypothesis|data)",
          "The initial belief before seeing any data",
          "The probability of the data averaged over all hypotheses",
          "The likelihood function alone"
        ],
        "answer": 0,
        "explain": "The posterior P(hypothesis|data) is the prior belief updated in light of observed evidence via Bayes' theorem.",
        "tag": "prior vs posterior"
      },
      {
        "q": "Why can a highly accurate medical test still yield mostly false positives when screening for a rare disease?",
        "options": [
          "Because Bayes' theorem doesn't apply to medical tests",
          "Because sensitivity and specificity are the same thing",
          "Because the low prior probability (prevalence) of the disease means the absolute number of false positives from the healthy majority can exceed true positives, even with high test accuracy",
          "Because the test's specificity is always 0"
        ],
        "answer": 2,
        "explain": "With a low base rate, even a small false-positive rate applied to the much larger healthy population produces more false positives than true positives from the rare disease group.",
        "tag": "base rate fallacy"
      },
      {
        "q": "In Naive Bayes classifiers, what does \"naive\" refer to?",
        "options": [
          "The assumption that all classes are equally likely",
          "The use of only linear decision boundaries",
          "The assumption that the prior is uniform",
          "The assumption that features are conditionally independent given the class label"
        ],
        "answer": 3,
        "explain": "Naive Bayes assumes features are conditionally independent given the class, which simplifies the joint likelihood into a product of per-feature likelihoods.",
        "tag": "Naive Bayes assumption"
      }
    ],
    "short": [
      {
        "q": "Using Bayes' theorem, explain why prior probability matters when interpreting a positive diagnostic test result.",
        "model": "Bayes' theorem gives P(disease|positive) = P(positive|disease)·P(disease) / P(positive), where P(disease) is the prior prevalence. Even with high sensitivity and specificity, if the prior prevalence is very low, the denominator P(positive) is dominated by false positives from the much larger healthy population, so the posterior probability of actually having the disease given a positive test can remain low. This is why prevalence (base rate) must be incorporated, not just the test's accuracy metrics.",
        "points": [
          "posterior combines likelihood with prior, not just test accuracy",
          "low base rate can make P(disease|positive) surprisingly low",
          "this is the base-rate fallacy in diagnostic reasoning"
        ],
        "tag": "base rate / posterior probability"
      }
    ]
  },
  "probability-calibration": {
    "mcq": [
      {
        "q": "What does it mean for a classifier to be \"well-calibrated\"?",
        "options": [
          "It always achieves 100% accuracy",
          "Among all instances where it predicts probability p, approximately fraction p actually belong to the positive class",
          "Its predicted probabilities are always 0 or 1",
          "It has the lowest possible log loss regardless of calibration"
        ],
        "answer": 1,
        "explain": "Calibration means predicted probabilities match empirical frequencies: among all cases predicted at confidence p, about p fraction should truly be positive.",
        "tag": "calibration definition"
      },
      {
        "q": "Why can modern deep neural networks be poorly calibrated despite high accuracy?",
        "options": [
          "They tend to produce overconfident predictions (probabilities pushed toward 0/1) due to training with cross-entropy on one-hot labels and over-parameterization",
          "They always underestimate their confidence",
          "Deep networks cannot output probabilities at all",
          "Calibration is only a concern for linear models"
        ],
        "answer": 0,
        "explain": "Training to minimize cross-entropy against hard one-hot labels, combined with high capacity, tends to push output probabilities toward extremes, causing overconfidence.",
        "tag": "neural network overconfidence"
      },
      {
        "q": "What does Platt scaling do?",
        "options": [
          "It removes features that hurt calibration",
          "It retrains the entire model from scratch",
          "It fits a logistic regression on top of the model's raw scores/logits (on a held-out set) to rescale outputs into calibrated probabilities",
          "It changes the model architecture to use softmax"
        ],
        "answer": 2,
        "explain": "Platt scaling learns a simple logistic transform of the model's raw scores using held-out data, mapping them to better-calibrated probabilities.",
        "tag": "Platt scaling"
      },
      {
        "q": "How is a reliability diagram used to assess calibration?",
        "options": [
          "It shows training loss over epochs",
          "It measures feature importance",
          "It shows the ROC curve",
          "It plots predicted confidence bins against the observed accuracy (fraction positive) in each bin — a well-calibrated model lies close to the diagonal"
        ],
        "answer": 3,
        "explain": "A reliability diagram bins predictions by confidence and compares each bin's average confidence to its observed accuracy; perfect calibration follows the diagonal.",
        "tag": "reliability diagrams"
      }
    ],
    "short": [
      {
        "q": "What is the difference between accuracy and calibration, and why might a highly accurate model still need calibration before use in decision-making?",
        "model": "Accuracy measures whether the predicted class label is correct, while calibration measures whether the predicted probability reflects the true likelihood of the outcome. A model can be highly accurate (correct majority class predictions) yet badly calibrated (e.g., always outputting 0.99 confidence even when actually wrong 10% of the time), which is problematic when downstream decisions rely on the probability itself (e.g., risk scoring, thresholding, expected value calculations). Techniques like Platt scaling or isotonic regression can recalibrate probabilities post-hoc without changing the underlying accuracy.",
        "points": [
          "accuracy = correct labels; calibration = correct probability estimates",
          "overconfident/underconfident models can still be accurate",
          "post-hoc calibration (Platt scaling, isotonic regression) fixes probability estimates for decision-making"
        ],
        "tag": "calibration vs accuracy"
      }
    ]
  },
  "cross-validation": {
    "mcq": [
      {
        "q": "What is the main purpose of k-fold cross-validation?",
        "options": [
          "To increase the size of the training set artificially",
          "To get a more robust estimate of model generalization performance by training/evaluating on multiple different train/validation splits",
          "To eliminate the need for a test set entirely",
          "To speed up training by using less data per fold"
        ],
        "answer": 1,
        "explain": "Averaging performance across k different train/validation splits gives a less noisy, more reliable estimate of generalization than a single split.",
        "tag": "purpose of cross-validation"
      },
      {
        "q": "In k-fold cross-validation, how many times is the model trained, and on what?",
        "options": [
          "Once, on the entire dataset",
          "k times, each time training and validating on the same fold",
          "Twice — once for training, once for testing",
          "k times, each time training on k-1 folds and validating on the remaining fold"
        ],
        "answer": 3,
        "explain": "Each of the k folds takes a turn as the validation set while the model is trained fresh on the remaining k-1 folds.",
        "tag": "k-fold mechanics"
      },
      {
        "q": "Why is stratified k-fold cross-validation preferred for imbalanced classification datasets?",
        "options": [
          "It ensures each fold preserves approximately the same class distribution as the full dataset, avoiding folds with too few/no minority-class examples",
          "It increases the number of folds automatically",
          "It removes the minority class entirely",
          "It requires no validation set"
        ],
        "answer": 0,
        "explain": "Stratification keeps class proportions consistent across folds, preventing a fold from having almost no minority-class examples, which would make evaluation unreliable.",
        "tag": "stratified k-fold"
      },
      {
        "q": "What is a key risk of using cross-validation for hyperparameter tuning if you then report the best fold's score as final performance?",
        "options": [
          "There's no risk — cross-validation eliminates all bias",
          "It causes underfitting",
          "Selecting hyperparameters based on CV performance and reporting that same CV score leads to optimistic bias; a held-out test set (never used in tuning) is needed for an unbiased final estimate",
          "It makes training infinitely slow"
        ],
        "answer": 2,
        "explain": "Choosing hyperparameters using the same scores you then report as 'final performance' leaks information from the evaluation into selection, biasing the estimate upward.",
        "tag": "CV leakage in tuning"
      }
    ],
    "short": [
      {
        "q": "Explain how k-fold cross-validation reduces the risk of an overly optimistic or pessimistic performance estimate compared to a single train/validation split.",
        "model": "A single train/validation split gives a performance estimate that depends heavily on which particular examples ended up in each set, so it can be noisy or biased by chance. K-fold cross-validation partitions data into k folds and repeats training/validation k times so every example serves as validation exactly once, then averages the k scores. This reduces variance in the estimate and uses all data for both training and validation across the folds, giving a more reliable estimate of how the model generalizes.",
        "points": [
          "single split estimate has high variance depending on the split",
          "every example used for validation exactly once across k folds",
          "averaging k scores reduces variance and gives more reliable generalization estimate"
        ],
        "tag": "k-fold mechanics & variance reduction"
      }
    ]
  },
  "data-split": {
    "mcq": [
      {
        "q": "What is the primary purpose of a held-out test set that is never touched during model development?",
        "options": [
          "To provide an unbiased final estimate of model performance on unseen data, since it wasn't used for training or hyperparameter tuning",
          "To speed up training",
          "To increase the effective training set size",
          "To replace the need for a validation set"
        ],
        "answer": 0,
        "explain": "A truly untouched test set gives an honest estimate of generalization, since no modeling decisions were informed by it.",
        "tag": "purpose of test set"
      },
      {
        "q": "Why is a separate validation set (distinct from the test set) commonly used during model development?",
        "options": [
          "To make the final performance estimate less accurate",
          "To tune hyperparameters and make model-selection decisions without contaminating the test set's unbiased estimate",
          "To directly compute the test set's accuracy",
          "It is not needed if you have a test set"
        ],
        "answer": 1,
        "explain": "The validation set absorbs the information leakage from hyperparameter/model-selection decisions, keeping the test set's estimate unbiased.",
        "tag": "role of validation set"
      },
      {
        "q": "What problem occurs if you use the test set repeatedly to guide model choices (e.g., architecture, hyperparameters)?",
        "options": [
          "Nothing — test sets can be reused freely",
          "The model trains faster",
          "You get \"leakage\" of test-set information into modeling decisions, causing the reported test performance to be an overly optimistic estimate of true generalization",
          "The test set becomes the new training set automatically"
        ],
        "answer": 2,
        "explain": "Repeatedly optimizing choices against the test set effectively fits to it, so its reported score no longer reflects performance on genuinely unseen data.",
        "tag": "test set leakage"
      },
      {
        "q": "When splitting time-series data into train/test sets, why should you avoid a random shuffle split?",
        "options": [
          "Random splits are always faster to compute",
          "Random splits produce identical folds every time",
          "Time-series data cannot be split at all",
          "Random splits would let future data leak into training, allowing the model to \"see the future\" and inflating performance estimates unrealistically; a chronological split should be used instead"
        ],
        "answer": 3,
        "explain": "Randomly shuffling time-ordered data lets future information leak into the training set, giving unrealistically optimistic performance versus a proper chronological split.",
        "tag": "time-series split"
      }
    ],
    "short": [
      {
        "q": "Why do we use three separate data splits (train/validation/test) instead of just train/test, and what goes wrong if this separation isn't respected?",
        "model": "The training set fits model parameters, the validation set is used to tune hyperparameters and select among models/architectures, and the test set gives a final, untouched estimate of generalization performance. If the validation and test sets are conflated (or the test set is used repeatedly for decisions), information from the \"unseen\" set leaks into the modeling process, so the final reported performance becomes optimistically biased and does not reflect true performance on genuinely new data.",
        "points": [
          "train fits parameters, validation tunes hyperparameters/model choice, test estimates final generalization",
          "test set must remain untouched until the very end",
          "reusing test set for decisions causes leakage and optimistic bias"
        ],
        "tag": "train/validation/test separation"
      }
    ]
  },
  "standardization-vs-normalization": {
    "mcq": [
      {
        "q": "What does standardization (z-score scaling) do to a feature?",
        "options": [
          "Scales values to a fixed range [0,1]",
          "Subtracts the mean and divides by the standard deviation, giving zero mean and unit variance",
          "Takes the logarithm of each value",
          "Converts categorical values to one-hot vectors"
        ],
        "answer": 1,
        "explain": "Standardization computes (x-μ)/σ, resulting in a feature with zero mean and unit variance.",
        "tag": "standardization mechanics"
      },
      {
        "q": "What does min-max normalization do to a feature?",
        "options": [
          "Rescales values to a fixed range (typically [0,1]) based on the observed minimum and maximum",
          "Centers data at zero mean",
          "Removes outliers from the dataset",
          "Applies a logarithmic transform"
        ],
        "answer": 0,
        "explain": "Min-max normalization linearly rescales values so the observed minimum maps to 0 and maximum maps to 1 (or another chosen range).",
        "tag": "min-max normalization mechanics"
      },
      {
        "q": "Why is standardization generally preferred over min-max normalization when a feature has significant outliers?",
        "options": [
          "Standardization ignores the mean entirely",
          "Standardization requires the data to be Gaussian",
          "Min-max normalization cannot handle negative numbers",
          "Min-max normalization is bounded, so a single extreme outlier compresses the rest of the data into a very narrow sub-range, whereas standardization is less sensitive to this compression effect"
        ],
        "answer": 3,
        "explain": "Because min-max scaling is anchored to the observed min/max, one extreme outlier squeezes all other values into a tiny sub-interval, distorting relative differences.",
        "tag": "outlier sensitivity"
      },
      {
        "q": "Why do gradient-descent-trained models (e.g., neural networks, linear/logistic regression) typically require feature scaling?",
        "options": [
          "Scaling changes the true labels of the data",
          "Feature scaling is only needed for tree-based models",
          "Unscaled features with very different ranges cause the loss surface to become elongated/skewed, making gradient descent converge slowly or unevenly across dimensions",
          "Feature scaling eliminates the need for a learning rate"
        ],
        "answer": 2,
        "explain": "Very different feature scales create an elongated, ill-conditioned loss surface, causing gradient descent to zig-zag and converge slowly.",
        "tag": "scaling and optimization"
      }
    ],
    "short": [
      {
        "q": "When would you choose min-max normalization over z-score standardization, and vice versa?",
        "model": "Min-max normalization is preferable when you need bounded input ranges (e.g., pixel intensities for image models, or algorithms that expect inputs in [0,1]) and the data doesn't have extreme outliers, since a single outlier can badly compress the rest of the range. Standardization is preferable when the feature distribution is roughly Gaussian, when outliers are present, or when using algorithms sensitive to variance (PCA, SVM, linear/logistic regression, neural networks trained with gradient descent), since it centers and scales without being bounded, and is more robust to outliers.",
        "points": [
          "min-max: bounded range, good for images/neural inputs, sensitive to outliers",
          "standardization: zero mean/unit variance, better for Gaussian-ish or outlier-prone data",
          "choice also depends on downstream algorithm assumptions (PCA, SVM, gradient descent)"
        ],
        "tag": "scaling method selection"
      }
    ]
  },
  "double-descent": {
    "mcq": [
      {
        "q": "What is the \"double descent\" phenomenon in modern machine learning?",
        "options": [
          "Test error decreases, then increases (classic overfitting peak near the interpolation threshold), then decreases again as model capacity grows further past the point of perfectly fitting training data",
          "Training loss always decreases monotonically with more epochs",
          "It refers to using two separate gradient descent optimizers simultaneously",
          "It describes a model whose accuracy decreases twice during training then stabilizes"
        ],
        "answer": 0,
        "explain": "Double descent describes test error following a U-shape then, past the interpolation threshold, decreasing again as capacity grows further into the over-parameterized regime.",
        "tag": "double descent curve"
      },
      {
        "q": "What is the \"interpolation threshold\" in the double descent curve?",
        "options": [
          "The moment training begins",
          "The learning rate at which training diverges",
          "The point where regularization is turned off",
          "The point where the model exactly fits (interpolates) the training data, often associated with a peak in test error"
        ],
        "answer": 3,
        "explain": "The interpolation threshold is where model capacity is just enough to perfectly fit (zero training error on) the training data, often coinciding with the worst test error.",
        "tag": "interpolation threshold"
      },
      {
        "q": "Why does test error often improve again in the \"over-parameterized\" regime beyond the interpolation threshold, contrary to classical bias-variance intuition?",
        "options": [
          "Because larger models always memorize noise perfectly, increasing test error further",
          "Because with enough capacity plus implicit regularization (e.g., from SGD), the model can find smoother/simpler interpolating solutions among the many that fit the training data exactly, improving generalization",
          "Because more parameters always guarantee lower bias with no variance cost",
          "Because the training data effectively duplicates itself"
        ],
        "answer": 1,
        "explain": "With many possible interpolating solutions, implicit regularization from the optimizer tends to select smoother/simpler ones, which generalize better than the single 'just barely fits' solution at the threshold.",
        "tag": "over-parameterization & implicit regularization"
      },
      {
        "q": "Which practical implication follows from the double descent phenomenon for choosing model size?",
        "options": [
          "One should always pick the smallest model that fits the training data",
          "Model size should never exceed the number of training examples",
          "A model near the interpolation threshold (just barely large enough to fit training data) can be a particularly poor choice, and it may be safer to go either clearly under-parameterized or substantially over-parameterized",
          "Interpolation threshold considerations apply only to linear regression"
        ],
        "answer": 2,
        "explain": "Test error often peaks right at the interpolation threshold, so models sized right around that point can generalize worse than either much smaller or much larger models.",
        "tag": "practical model sizing"
      }
    ],
    "short": [
      {
        "q": "Describe the double descent curve and why it complicates the classical bias-variance tradeoff narrative.",
        "model": "Classical theory predicts test error follows a U-shape: it decreases as model capacity grows, then increases past some point due to overfitting. Double descent shows that as capacity increases further, past the 'interpolation threshold' where the model can perfectly fit the training data, test error can decrease again, producing a second descent. This happens because heavily over-parameterized models, combined with implicit regularization from optimization (e.g., SGD) or explicit regularization, can find smoother interpolating solutions among the infinitely many that fit the data exactly, rather than simply memorizing noise. This means capacity increases don't always follow the simple monotonic bias-variance story, and the danger zone is often right at the interpolation threshold, not necessarily at maximum capacity.",
        "points": [
          "classical U-shaped bias-variance curve breaks down at very high capacity",
          "interpolation threshold is often where test error peaks, not where it's worst overall",
          "over-parameterized models can generalize well due to implicit regularization/simpler interpolating solutions"
        ],
        "tag": "interpolation threshold & over-parameterization"
      }
    ]
  },
  "multiclass-vs-multilabel": {
    "mcq": [
      {
        "q": "What distinguishes multilabel classification from multiclass classification?",
        "options": [
          "Multilabel allows each instance to be assigned zero, one, or multiple labels simultaneously, whereas multiclass assigns exactly one label from a set of mutually exclusive classes",
          "Multilabel only supports binary labels",
          "Multiclass allows multiple labels per instance while multilabel allows only one",
          "There is no meaningful difference between them"
        ],
        "answer": 0,
        "explain": "Multiclass problems have mutually exclusive classes (exactly one label per instance); multilabel problems allow any number of non-exclusive labels per instance.",
        "tag": "multiclass vs multilabel definition"
      },
      {
        "q": "Which output layer / activation is typically used for multiclass classification (single label from many classes)?",
        "options": [
          "Multiple independent binary classifiers with no normalization",
          "Linear activation with MSE loss",
          "Sigmoid activation per class with binary cross-entropy per class",
          "Softmax activation producing a single probability distribution over all classes, paired with categorical cross-entropy"
        ],
        "answer": 3,
        "explain": "Softmax couples class scores into one probability distribution that sums to 1, matching the mutually-exclusive-class assumption of multiclass problems.",
        "tag": "multiclass output layer"
      },
      {
        "q": "Which output layer / activation is typically used for multilabel classification (multiple labels can be active)?",
        "options": [
          "Softmax over all classes, forcing probabilities to sum to 1",
          "An independent sigmoid activation per label with binary cross-entropy per label, since labels are not mutually exclusive",
          "A single softmax shared with a regression head",
          "Argmax over class scores"
        ],
        "answer": 1,
        "explain": "Since multiple labels can be simultaneously true, each label needs its own independent sigmoid + binary cross-entropy rather than a competing softmax distribution.",
        "tag": "multilabel output layer"
      },
      {
        "q": "For a multilabel problem, which evaluation metric is commonly used to account for partial correctness across multiple labels per instance, unlike simple accuracy?",
        "options": [
          "A single top-1 accuracy across all labels",
          "Perplexity",
          "Micro/macro-averaged F1 score (or Hamming loss) computed across all label predictions per instance",
          "ROC-AUC computed only on the majority class"
        ],
        "answer": 2,
        "explain": "Micro/macro F1 and Hamming loss account for partially-correct label sets per instance, unlike top-1 accuracy which assumes a single correct label.",
        "tag": "multilabel evaluation metrics"
      }
    ],
    "short": [
      {
        "q": "How would you architect the output layer and loss function differently for a multiclass vs. a multilabel image classification problem, and why?",
        "model": "For multiclass classification, where each image belongs to exactly one of several mutually exclusive classes, the output layer uses softmax (which normalizes scores into a probability distribution summing to 1) paired with categorical cross-entropy loss. For multilabel classification, where an image can belong to multiple non-exclusive categories simultaneously (e.g., \"outdoor,\" \"dog,\" \"person\" all at once), each label gets its own independent sigmoid output and binary cross-entropy loss, since the presence of one label doesn't preclude others. Using softmax for a multilabel problem would incorrectly force the label probabilities to compete and sum to 1.",
        "points": [
          "multiclass: softmax + categorical cross-entropy, labels mutually exclusive",
          "multilabel: independent sigmoid per label + binary cross-entropy, labels not mutually exclusive",
          "using softmax for multilabel wrongly forces labels to compete for probability mass"
        ],
        "tag": "output layer architecture choice"
      }
    ]
  },
  "k-nearest-neighbors": {
    "mcq": [
      {
        "q": "What does KNN do at prediction time for classification?",
        "options": [
          "Fits a decision boundary during training",
          "Finds the k closest training points and takes a majority vote among their labels",
          "Builds a probabilistic model of class priors and likelihoods",
          "Constructs a tree structure to partition the feature space"
        ],
        "answer": 1,
        "explain": "KNN is a lazy, instance-based method: it stores training data and, at prediction time, finds the k nearest points and votes on their labels.",
        "tag": "core mechanism"
      },
      {
        "q": "Why is KNN called a 'lazy learner'?",
        "options": [
          "It only works with lazily evaluated programming languages",
          "It requires no training data whatsoever",
          "It defers nearly all computation to prediction time, simply storing the training set rather than fitting an explicit model",
          "It is guaranteed to be slower than eager learners in every case"
        ],
        "answer": 2,
        "explain": "KNN skips an explicit training/fitting phase and instead does its work at query time by scanning stored examples.",
        "tag": "lazy vs eager learning"
      },
      {
        "q": "Why does KNN's performance often degrade in very high-dimensional feature spaces?",
        "options": [
          "k must always be set to 1 in high dimensions",
          "Euclidean distance calculations become computationally impossible above 10 dimensions",
          "High dimensions force categorical encoding errors",
          "Distances between points tend to concentrate (become similar), so nearest and farthest neighbors are less distinguishable — the curse of dimensionality"
        ],
        "answer": 3,
        "explain": "As dimensionality grows, distance metrics lose discriminative power because points become roughly equidistant, weakening the notion of 'nearest' neighbor.",
        "tag": "curse of dimensionality"
      },
      {
        "q": "How does the choice of k typically affect the bias-variance tradeoff in KNN?",
        "options": [
          "Small k gives low bias but high variance (sensitive to noise); large k gives higher bias but lower variance (smoother boundary)",
          "Small k gives high bias and low variance; large k gives low bias and high variance",
          "k has no effect on bias or variance, only on runtime",
          "Large k always minimizes both bias and variance simultaneously"
        ],
        "answer": 0,
        "explain": "With small k, predictions depend on very few nearby points and swing with noise (high variance); with large k, predictions average over more points, smoothing the boundary but potentially blurring true structure (higher bias).",
        "tag": "bias-variance tradeoff"
      }
    ],
    "short": [
      {
        "q": "Explain why feature scaling (e.g., standardization) matters for KNN and how you would choose the value of k in practice.",
        "model": "KNN relies on distance metrics like Euclidean distance, so features with larger numeric ranges dominate the distance calculation unless all features are scaled to comparable ranges (e.g., z-score standardization or min-max scaling). For choosing k, small k gives a flexible but noisy decision boundary (low bias, high variance) while large k oversmooths (high bias, low variance); in practice k is tuned via cross-validation over a range of values, often odd numbers for binary classification to avoid ties.",
        "points": [
          "distance-based algorithm → unscaled features dominate distance",
          "standardize/normalize features before computing distances",
          "k tuned via cross-validation, balancing under/overfitting",
          "odd k avoids ties in binary classification"
        ],
        "tag": "feature scaling & k selection"
      }
    ]
  },
  "clustering": {
    "mcq": [
      {
        "q": "What objective does the k-means algorithm minimize?",
        "options": [
          "The number of clusters used",
          "The sum of squared distances between each point and its assigned cluster centroid (within-cluster variance)",
          "The pairwise distance between all points in the dataset",
          "The number of iterations needed for convergence"
        ],
        "answer": 1,
        "explain": "K-means iteratively assigns points to the nearest centroid and updates centroids to minimize total within-cluster sum of squares.",
        "tag": "k-means objective"
      },
      {
        "q": "Which of the following is a well-known limitation of k-means clustering?",
        "options": [
          "It cannot be initialized randomly",
          "It requires labeled data to run",
          "It assumes clusters are roughly spherical/convex and similarly sized, so it struggles with elongated or non-convex clusters",
          "It always finds the global optimum on the first run"
        ],
        "answer": 2,
        "explain": "Because k-means assigns points based on distance to a single centroid, it implicitly assumes convex, similarly-sized clusters and fails on irregular shapes or very different cluster densities.",
        "tag": "k-means limitations"
      },
      {
        "q": "How does DBSCAN differ from k-means?",
        "options": [
          "DBSCAN requires specifying the number of clusters (k) upfront, whereas k-means does not",
          "DBSCAN always produces a strict hierarchy of nested clusters (a dendrogram)",
          "DBSCAN and k-means make identical assumptions about cluster shape",
          "DBSCAN groups points based on density reachability, can find arbitrarily-shaped clusters, and doesn't require pre-specifying the number of clusters"
        ],
        "answer": 3,
        "explain": "DBSCAN forms clusters from densely connected regions of points, naturally handling arbitrary shapes and noise, and determines the cluster count from the data rather than as an input.",
        "tag": "density-based clustering"
      },
      {
        "q": "Which technique is commonly used to help choose the number of clusters k in k-means when it is not known in advance?",
        "options": [
          "The elbow method (plotting WCSS vs. k) or silhouette score analysis",
          "Always setting k equal to the number of features",
          "Running k-means once with k=2 and never changing it",
          "Minimizing cross-entropy loss"
        ],
        "answer": 0,
        "explain": "The elbow method looks for a point of diminishing returns in within-cluster sum of squares as k increases, and silhouette scores measure cluster separation/cohesion — both help select a reasonable k.",
        "tag": "choosing number of clusters"
      }
    ],
    "short": [
      {
        "q": "Explain the difference between k-means and hierarchical (agglomerative) clustering, including a practical scenario where you'd prefer one over the other.",
        "model": "K-means partitions data into a pre-specified number k of flat clusters by iteratively assigning points to the nearest centroid and recomputing centroids, minimizing within-cluster variance; it scales well to large datasets but requires choosing k and assumes roughly spherical clusters. Hierarchical (agglomerative) clustering builds a nested tree (dendrogram) by successively merging the closest clusters or points, requiring no upfront k and allowing inspection of structure at any cut level, but it is typically much more expensive computationally, making it impractical for very large datasets. You'd prefer k-means for large, roughly-convex datasets with a rough estimate of k, and hierarchical clustering for smaller datasets where exploring nested cluster structure matters or k is unknown.",
        "points": [
          "k-means: flat partition, needs k specified upfront, scales well, assumes spherical clusters",
          "hierarchical: nested dendrogram, no k needed upfront, computationally expensive",
          "elbow/silhouette methods used to pick k for k-means",
          "choice depends on dataset size and whether hierarchical structure is useful"
        ],
        "tag": "k-means vs hierarchical"
      }
    ]
  },
  "support-vector-machines": {
    "mcq": [
      {
        "q": "What is the core objective of a linear SVM classifier?",
        "options": [
          "Minimize the number of support vectors used",
          "Find the hyperplane that maximizes the margin between the closest points of each class",
          "Fit a full probability distribution over classes",
          "Minimize total training error only, ignoring margin width"
        ],
        "answer": 1,
        "explain": "SVMs seek the maximum-margin separating hyperplane, which tends to generalize better than one that merely separates the training data.",
        "tag": "max-margin objective"
      },
      {
        "q": "What is the 'kernel trick' in SVMs?",
        "options": [
          "A way to reduce the number of support vectors to speed up training",
          "A regularization technique that penalizes large weights",
          "A method to implicitly compute dot products as if data were mapped into a higher-dimensional feature space, without explicitly transforming the data, enabling non-linear boundaries",
          "A trick to convert an SVM into a decision tree"
        ],
        "answer": 2,
        "explain": "Kernel functions (e.g., RBF, polynomial) compute inner products in an implicit higher-dimensional space efficiently, letting SVMs learn non-linear decision boundaries without explicit feature transformation.",
        "tag": "kernel trick"
      },
      {
        "q": "What does the C (regularization) hyperparameter control in a soft-margin SVM?",
        "options": [
          "The number of kernel functions used",
          "The dimensionality of the feature space",
          "The learning rate of gradient descent",
          "The trade-off between maximizing the margin and minimizing classification error on training data — large C tolerates fewer margin violations (narrower margin, risk of overfitting), small C tolerates more (wider margin, risk of underfitting)"
        ],
        "answer": 3,
        "explain": "C penalizes margin violations; large C pushes for a tighter fit to training data at the cost of margin width, while small C allows a wider, more regularized margin.",
        "tag": "C hyperparameter tradeoff"
      },
      {
        "q": "Which points determine the position of the SVM decision boundary?",
        "options": [
          "Only the support vectors — points lying on or within the margin — determine the hyperplane; other points don't affect it",
          "All training points equally influence the boundary",
          "Only the centroid of each class",
          "Only the misclassified points"
        ],
        "answer": 0,
        "explain": "The SVM solution depends only on the support vectors near the decision boundary; points far from the margin can be removed without changing the fitted hyperplane.",
        "tag": "support vectors"
      }
    ],
    "short": [
      {
        "q": "Explain why SVMs with an RBF kernel can overfit, and how the gamma and C hyperparameters interact to affect this.",
        "model": "The RBF kernel maps data into a very high-dimensional space where highly flexible, wiggly decision boundaries are possible; if gamma is large, each training point's influence radius shrinks so the boundary can wrap tightly around individual points, risking overfitting, while small gamma gives points a wider influence and smoother boundaries. C controls tolerance for margin violations — large C forces the model to fit the training data closely, compounding overfitting when combined with large gamma, whereas smaller C with smaller gamma yields smoother, more regularized boundaries. In practice gamma and C are tuned jointly via cross-validation (e.g., grid search) to balance bias and variance.",
        "points": [
          "RBF kernel enables highly flexible non-linear boundaries",
          "large gamma → narrow influence radius → tight/wiggly boundary → overfit risk",
          "large C → less tolerance for margin violations → overfit risk",
          "gamma and C tuned jointly via cross-validation"
        ],
        "tag": "RBF kernel hyperparameters"
      }
    ]
  },
  "naive-bayes": {
    "mcq": [
      {
        "q": "What 'naive' assumption does Naive Bayes make?",
        "options": [
          "That all classes are equally likely a priori",
          "That features are conditionally independent given the class label",
          "That the data is linearly separable",
          "That there are no missing values in the data"
        ],
        "answer": 1,
        "explain": "Naive Bayes simplifies the joint likelihood by assuming each feature contributes independently to the class probability, given the class.",
        "tag": "conditional independence assumption"
      },
      {
        "q": "Why is Laplace (additive) smoothing used in Naive Bayes for text classification?",
        "options": [
          "To speed up training time",
          "To reduce the number of features needed",
          "To prevent zero probability estimates when a word in the test set never appeared with a given class in training, which would otherwise zero out the entire posterior product",
          "To convert continuous features into discrete bins"
        ],
        "answer": 2,
        "explain": "Without smoothing, an unseen word/class combination gives a likelihood of zero, which multiplies through and zeroes the whole posterior regardless of other evidence; Laplace smoothing adds a small pseudocount to avoid this.",
        "tag": "Laplace smoothing"
      },
      {
        "q": "Naive Bayes classifies a new instance by:",
        "options": [
          "Choosing the class with the highest posterior probability, computed via Bayes' theorem from the prior and per-feature likelihoods under the conditional independence assumption",
          "Finding the k most similar training examples",
          "Maximizing the margin between classes",
          "Minimizing squared error between predicted and actual labels"
        ],
        "answer": 0,
        "explain": "Naive Bayes is a generative classifier: it estimates priors and likelihoods, combines them via Bayes' theorem, and picks the class maximizing the posterior.",
        "tag": "posterior classification rule"
      },
      {
        "q": "Despite its independence assumption often being violated in practice, why does Naive Bayes frequently perform well as a classifier?",
        "options": [
          "Because real-world features are always independent",
          "Because it uses internal regularization to correct for feature dependence",
          "Because it only works well on small datasets where independence trivially holds",
          "Because classification only requires getting the relative ranking of class posteriors correct, not accurate probability estimates — so correlated features pushing in a consistent direction don't necessarily flip which class wins"
        ],
        "answer": 3,
        "explain": "Even with miscalibrated probabilities from violated independence assumptions, the class with the highest (even if biased) posterior often remains correct, so decision accuracy holds up better than probability calibration would suggest.",
        "tag": "why naive bayes works"
      }
    ],
    "short": [
      {
        "q": "Naive Bayes is often used as a strong baseline for text classification. Explain the generative model it assumes and one key advantage plus one key limitation compared to discriminative classifiers like logistic regression.",
        "model": "Naive Bayes is a generative model: it estimates P(class) as a prior and P(feature|class) for each feature as a likelihood (assuming conditional independence given the class), then applies Bayes' theorem to compute P(class|features) and picks the class with the highest posterior. Its key advantage is efficiency — it trains in a single pass by counting frequencies, needs relatively little data to estimate parameters, and scales well to high-dimensional sparse data like bag-of-words text. Its key limitation is the independence assumption, which is frequently violated (e.g., correlated words), leading to miscalibrated probability estimates even though classification accuracy often remains competitive.",
        "points": [
          "generative model: models P(class) and P(feature|class) separately",
          "uses Bayes' theorem plus conditional independence assumption to get posterior",
          "advantage: fast, low data requirement, scales to high-dimensional sparse features",
          "limitation: independence assumption often violated → poorly calibrated probabilities"
        ],
        "tag": "generative vs discriminative"
      }
    ]
  },
  "decision-trees-ensembles": {
    "mcq": [
      {
        "q": "What criterion do decision trees commonly use to choose splits for classification?",
        "options": [
          "Mean squared error only",
          "Gini impurity or information gain (entropy reduction)",
          "Euclidean distance to a cluster centroid",
          "Support vector margin width"
        ],
        "answer": 1,
        "explain": "Classification trees typically pick the split that most reduces Gini impurity or entropy, i.e., that best separates classes at each node.",
        "tag": "split criteria"
      },
      {
        "q": "What is the main difference between bagging (e.g., Random Forest) and boosting (e.g., Gradient Boosting)?",
        "options": [
          "Bagging trains trees sequentially, each correcting the prior tree's errors; boosting trains trees independently in parallel",
          "Bagging and boosting are identical except for the name",
          "Bagging trains many trees independently in parallel on bootstrapped samples and averages predictions to reduce variance; boosting trains trees sequentially, each focusing on the previous ensemble's errors, primarily reducing bias",
          "Bagging only reduces bias; boosting only reduces variance"
        ],
        "answer": 2,
        "explain": "Bagging reduces variance by averaging independent, high-variance models trained on bootstrap samples; boosting reduces bias by sequentially fitting new models to the residual errors of the existing ensemble.",
        "tag": "bagging vs boosting"
      },
      {
        "q": "Why does Random Forest randomly restrict the subset of features considered at each split, in addition to bootstrap sampling rows?",
        "options": [
          "It ensures every tree overfits identically for consistency",
          "It only reduces computation time and has no effect on accuracy",
          "It forces every tree to use identical splits regardless of the data",
          "It decorrelates the individual trees, so averaging them reduces variance more than bagging on rows alone"
        ],
        "answer": 3,
        "explain": "If every tree could pick the same strong predictor at the top split, the trees would be highly correlated and averaging would not reduce variance much; random feature subsets force diversity among trees.",
        "tag": "random feature subsampling"
      },
      {
        "q": "A single unpruned decision tree tends to have low bias but high variance. Which statement about controlling this is correct?",
        "options": [
          "Limiting tree depth, requiring a minimum samples per leaf, or pruning reduces variance (and overfitting) at the cost of some added bias",
          "Increasing tree depth always reduces variance",
          "Decision trees cannot overfit regardless of depth",
          "The only way to control variance is to switch to a linear model"
        ],
        "answer": 0,
        "explain": "Constraining tree complexity (max depth, min samples per leaf, pruning) trades a small increase in bias for a substantial reduction in variance, improving generalization.",
        "tag": "tree regularization"
      }
    ],
    "short": [
      {
        "q": "Explain, in terms of bias and variance, why Random Forests tend to reduce overfitting compared to a single deep decision tree, and why Gradient Boosting can achieve low bias but risks overfitting if not regularized.",
        "model": "A single deep decision tree has low bias (it can fit training data very closely) but high variance (small changes in data lead to very different trees). Random Forest averages many such high-variance, low-bias trees trained on bootstrapped samples with random feature subsets; because the trees are decorrelated, averaging cancels out much of their individual variance while keeping bias low, so the ensemble generalizes better. Gradient Boosting instead builds trees sequentially, each fitting the residual errors of the ensemble so far, progressively driving down bias; however, because it keeps adding capacity to fit the training data more closely, without regularization (learning rate/shrinkage, tree depth limits, number of estimators, subsampling) it can eventually fit noise in the residuals and overfit.",
        "points": [
          "single deep tree: low bias, high variance",
          "Random Forest: averages decorrelated trees → variance reduction, bias stays low",
          "Gradient Boosting: sequential residual-fitting → progressively reduces bias",
          "boosting needs regularization (learning rate, depth limits, early stopping) to avoid overfitting"
        ],
        "tag": "bagging vs boosting bias-variance"
      }
    ]
  },
  "ml-comp": {
    "mcq": [
      {
        "q": "Which factor most directly favors choosing a simple linear/logistic regression model over a complex model like a deep neural network or gradient boosted trees?",
        "options": [
          "When you have millions of training examples and complex non-linear relationships",
          "When interpretability, small training data, and/or a roughly linear relationship between features and target matter more than squeezing out marginal accuracy gains",
          "When the primary goal is to maximize raw predictive accuracy regardless of interpretability",
          "When features are highly non-linear and interact heavily"
        ],
        "answer": 1,
        "explain": "Simple linear models shine when you need transparency, have limited data (fewer parameters to estimate reliably), or the true relationship is close to linear.",
        "tag": "model selection criteria"
      },
      {
        "q": "Which pair of models is generally most interpretable 'out of the box'?",
        "options": [
          "Deep neural networks and SVMs with an RBF kernel",
          "Random Forest and Gradient Boosting",
          "k-NN and kernel SVM",
          "Linear/logistic regression and a shallow decision tree"
        ],
        "answer": 3,
        "explain": "Linear/logistic regression coefficients and shallow decision tree splits can be directly inspected and explained, unlike black-box ensembles, kernel methods, or deep networks.",
        "tag": "interpretability comparison"
      },
      {
        "q": "Which statement about training-time computational cost is generally accurate?",
        "options": [
          "Naive Bayes is typically among the fastest algorithms to train, since it just estimates simple per-feature/class statistics via counting, whereas deep neural nets and large gradient-boosted ensembles typically require far more compute",
          "k-NN has an expensive training phase since it must build a complex model structure",
          "SVMs with non-linear (e.g., RBF) kernels scale linearly and cheaply to millions of examples",
          "All model classes have essentially identical training cost"
        ],
        "answer": 0,
        "explain": "Naive Bayes only needs simple counting/statistics per feature and class, making it extremely cheap to train, while deep ensembles and neural networks require iterative optimization over many parameters.",
        "tag": "training cost comparison"
      },
      {
        "q": "You need a model that captures complex non-linear feature interactions in tabular data with a moderate number of samples (tens of thousands), and you want strong out-of-the-box accuracy without heavy tuning. Which model family is often the best first choice?",
        "options": [
          "Plain linear regression",
          "k-NN with a very high k value",
          "Gradient boosted decision trees (e.g., XGBoost/LightGBM)",
          "Naive Bayes"
        ],
        "answer": 2,
        "explain": "Gradient boosted tree ensembles are widely regarded as strong, robust performers on tabular data with non-linear interactions, often winning with modest tuning compared to linear models or Naive Bayes.",
        "tag": "practical model choice"
      }
    ],
    "short": [
      {
        "q": "When comparing k-NN, Naive Bayes, SVM, and decision-tree ensembles for a new tabular classification problem, what are the key axes you'd use to decide, and how does dataset size/dimensionality typically shift the decision?",
        "model": "Key axes include: interpretability (decision trees and Naive Bayes are more transparent than SVM/k-NN), training and prediction speed (Naive Bayes trains fastest; k-NN has near-zero training cost but expensive prediction; ensembles and kernel SVMs are more compute-intensive), robustness to high dimensionality and irrelevant features (Naive Bayes and linear-kernel SVMs tend to handle high-dimensional sparse data well, while k-NN suffers from the curse of dimensionality), and expected accuracy on complex non-linear interactions (gradient boosted trees and kernel SVMs typically outperform simpler models here). As dataset size grows, ensembles and kernel methods become more attractive since they have more data to fit complex patterns without overfitting, whereas k-NN's prediction cost and memory grow with data size, making it less practical at scale; conversely, with very small datasets, simpler models like Naive Bayes or regularized linear models often generalize better than high-capacity ensembles or neural nets.",
        "points": [
          "axes: interpretability, train/predict speed, handling of high dimensionality, ability to capture non-linear interactions",
          "Naive Bayes: fast, handles high-dim sparse data, less accurate with correlated features",
          "k-NN: no training cost but expensive/slow prediction, suffers in high dimensions",
          "ensembles/kernel SVM: best accuracy on complex interactions but need more data & tuning; simpler models preferred on very small datasets"
        ],
        "tag": "model selection tradeoffs"
      }
    ]
  },
  "architectures": {
    "mcq": [
      {
        "q": "What is the primary purpose of an activation function in a neural network?",
        "options": [
          "To introduce non-linearity so the network can model complex functions",
          "To normalize input features",
          "To reduce the number of parameters",
          "To speed up gradient descent convergence only"
        ],
        "answer": 0,
        "explain": "Non-linear activations let stacked layers represent functions beyond simple linear transforms.",
        "tag": "activation functions"
      },
      {
        "q": "Why do deep networks with many stacked linear layers (no non-linearity) fail to gain expressive power beyond a single layer?",
        "options": [
          "Because gradients vanish immediately",
          "Because the composition of linear functions is itself linear",
          "Because linear layers cannot be initialized properly",
          "Because they require too much memory"
        ],
        "answer": 1,
        "explain": "Composing affine transformations (Wx+b) yields another affine transformation, regardless of depth.",
        "tag": "linear layer composition"
      },
      {
        "q": "In a feedforward (fully connected) network, what does increasing depth (more layers) generally allow the network to do that increasing width alone does not?",
        "options": [
          "Guarantee faster training",
          "Reduce the risk of overfitting",
          "Learn hierarchical, increasingly abstract feature representations",
          "Eliminate the need for activation functions"
        ],
        "answer": 2,
        "explain": "Depth enables composing simple features into progressively more abstract ones layer by layer.",
        "tag": "depth vs width"
      },
      {
        "q": "Which activation function is most associated with mitigating vanishing gradients compared to sigmoid/tanh, due to having a constant gradient of 1 for positive inputs?",
        "options": [
          "Sigmoid",
          "Softmax",
          "tanh",
          "ReLU"
        ],
        "answer": 3,
        "explain": "ReLU's derivative is 1 for positive inputs, avoiding the gradient saturation seen in sigmoid/tanh.",
        "tag": "ReLU vanishing gradient"
      }
    ],
    "short": [
      {
        "q": "Explain why a multi-layer perceptron with only linear activations is equivalent to a single-layer linear model, and what non-linear activations add.",
        "model": "Stacking linear transformations (Wx+b) without non-linearity results in a composition that is still an affine function of the input, since matrix multiplications and additions compose into another matrix multiplication and addition. This means no matter how many layers are added, the network can only represent linear decision boundaries. Non-linear activation functions (ReLU, sigmoid, tanh) inserted between layers break this composition, allowing the network to approximate arbitrary non-linear functions and build hierarchical feature representations, which is essential for tasks like image and language understanding.",
        "points": [
          "composition of linear functions is linear",
          "non-linearity enables universal function approximation",
          "hierarchical feature learning requires non-linearity"
        ],
        "tag": "non-linearity necessity"
      }
    ]
  },
  "cnn": {
    "mcq": [
      {
        "q": "What is the main advantage of using convolutional (shared weight) filters over fully-connected layers for image data?",
        "options": [
          "They eliminate the need for activation functions",
          "They drastically reduce parameters via weight sharing and exploit local spatial structure",
          "They guarantee translation invariance without pooling",
          "They require larger images to work"
        ],
        "answer": 1,
        "explain": "A single filter is reused across all spatial locations, sharply cutting parameters while exploiting locality.",
        "tag": "weight sharing / parameter efficiency"
      },
      {
        "q": "What does a pooling layer (e.g., max pooling) primarily achieve in a CNN?",
        "options": [
          "Increases spatial resolution",
          "Adds non-linearity equivalent to ReLU",
          "Downsamples feature maps, providing translation invariance and reducing computation",
          "Normalizes activations across the batch"
        ],
        "answer": 2,
        "explain": "Pooling aggregates a local region into one value, shrinking feature maps and adding some invariance to small shifts.",
        "tag": "pooling downsampling"
      },
      {
        "q": "If a convolutional layer uses a 3x3 kernel, stride 1, and no padding, on a 32x32 input, what is the output spatial size?",
        "options": [
          "30x30",
          "32x32",
          "28x28",
          "34x34"
        ],
        "answer": 0,
        "explain": "Output size = (32-3)/1 + 1 = 30, so the result is 30x30.",
        "tag": "output size calculation"
      },
      {
        "q": "What is the 'receptive field' of a neuron in a CNN?",
        "options": [
          "The learning rate applied to that neuron",
          "The size of the pooling window only",
          "The number of channels it outputs",
          "The region of the input image that influences that neuron's activation"
        ],
        "answer": 3,
        "explain": "The receptive field is the input area whose pixels can affect a given neuron's value, growing with depth.",
        "tag": "receptive field"
      }
    ],
    "short": [
      {
        "q": "Explain why stacking multiple small convolutional filters (e.g., three 3x3 layers) instead of one large filter (7x7) can be preferable.",
        "model": "Three stacked 3x3 convolutional layers have the same effective receptive field as a single 7x7 layer but use fewer parameters (3*(3*3)=27 vs 49 per input-output channel pair) and introduce more non-linear activation functions between them, increasing the network's representational capacity. This design, popularized by VGG, generally improves discriminative power while being more computationally efficient.",
        "points": [
          "same receptive field with fewer parameters",
          "more non-linearities between stacked smaller filters",
          "improves efficiency and representational power"
        ],
        "tag": "stacked small filters vs large filter"
      }
    ]
  },
  "batchnorm": {
    "mcq": [
      {
        "q": "What problem does Batch Normalization primarily aim to address?",
        "options": [
          "Overfitting on small datasets",
          "Internal covariate shift — the change in distribution of layer inputs during training",
          "Class imbalance in the training data",
          "Vanishing gradients in RNNs only"
        ],
        "answer": 1,
        "explain": "BatchNorm normalizes layer inputs to stabilize their distribution as earlier layers' weights change during training.",
        "tag": "internal covariate shift"
      },
      {
        "q": "During inference (test time), what statistics does Batch Normalization use to normalize activations instead of the current batch statistics?",
        "options": [
          "Running (exponential moving average) mean and variance accumulated during training",
          "Statistics from a single random training example",
          "Zero mean and unit variance are assumed without any stored stats",
          "The statistics of the test batch itself"
        ],
        "answer": 0,
        "explain": "BatchNorm tracks running averages of mean/variance during training and reuses them at inference for deterministic behavior.",
        "tag": "train vs inference behavior"
      },
      {
        "q": "What do the learnable parameters gamma (scale) and beta (shift) in BatchNorm allow the network to do?",
        "options": [
          "Compute the batch mean and variance more efficiently",
          "Control the learning rate schedule",
          "Restore representational power by letting the network learn an optimal scale/shift, potentially undoing the normalization if needed",
          "Replace the need for activation functions"
        ],
        "answer": 2,
        "explain": "Gamma and beta let the network recover any distribution (including the pre-normalization one) if that is optimal.",
        "tag": "learnable scale and shift"
      },
      {
        "q": "Why does BatchNorm tend to perform poorly or unpredictably with very small batch sizes (e.g., batch size 2)?",
        "options": [
          "It has no issue with small batches",
          "Small batches cause exploding gradients specifically",
          "Small batches make gamma and beta untrainable",
          "Batch statistics (mean/variance) become noisy/unreliable estimates of the true distribution"
        ],
        "answer": 3,
        "explain": "With few samples per batch, the computed mean/variance are high-variance estimates, destabilizing normalization.",
        "tag": "small batch size instability"
      }
    ],
    "short": [
      {
        "q": "Describe how Batch Normalization changes the training dynamics of a deep network and why it often allows higher learning rates.",
        "model": "BatchNorm normalizes each layer's activations to zero mean and unit variance (per mini-batch) before applying a learned scale and shift, which keeps intermediate activations in a stable range throughout training even as earlier layers' weights change. This reduces the sensitivity of a layer's inputs to updates in preceding layers, smoothing the optimization landscape and reducing the risk of activations exploding or vanishing. As a result, training is more stable at larger learning rates, convergence is faster, and the network becomes less sensitive to initialization.",
        "points": [
          "normalizes activations per mini-batch (mean/variance)",
          "reduces sensitivity to earlier-layer weight changes",
          "enables higher learning rates and faster, more stable convergence"
        ],
        "tag": "training stability and learning rate"
      }
    ]
  },
  "dropout": {
    "mcq": [
      {
        "q": "What does Dropout do during training?",
        "options": [
          "Removes entire layers from the network permanently",
          "Randomly zeroes out (drops) a fraction of neuron activations each forward pass",
          "Normalizes activations to unit variance",
          "Reduces the learning rate over time"
        ],
        "answer": 1,
        "explain": "Dropout randomly masks a fraction of units on each forward pass, resampled every iteration.",
        "tag": "random unit deactivation"
      },
      {
        "q": "Why is Dropout considered a regularization technique that reduces overfitting?",
        "options": [
          "It forces the network to not rely too heavily on any single neuron, effectively training an ensemble of sub-networks",
          "It reduces the number of training examples needed",
          "It increases model capacity",
          "It replaces the need for a validation set"
        ],
        "answer": 0,
        "explain": "By randomly removing units, Dropout prevents co-adaptation and approximates averaging many thinned networks.",
        "tag": "ensemble / co-adaptation reduction"
      },
      {
        "q": "At test/inference time, how is standard (inverted) Dropout typically handled?",
        "options": [
          "Dropout is still applied randomly, exactly as in training",
          "Only half the units are used at test time",
          "All units are used, with activations already scaled during training (inverted dropout) so no change is needed at test time",
          "Dropout rate is doubled at test time"
        ],
        "answer": 2,
        "explain": "Inverted dropout scales retained activations during training, so at test time the full network runs unchanged.",
        "tag": "inverted dropout at inference"
      },
      {
        "q": "Using a very high dropout rate (e.g., 0.9) on a small hidden layer is likely to cause what issue?",
        "options": [
          "Severe overfitting",
          "No effect on training",
          "Guaranteed faster convergence",
          "Underfitting, since too much information is discarded each pass, hurting the network's ability to learn"
        ],
        "answer": 3,
        "explain": "Dropping 90% of a small layer's units removes too much signal, starving the network of capacity to learn.",
        "tag": "dropout rate tuning / underfitting"
      }
    ],
    "short": [
      {
        "q": "Explain the intuition behind why Dropout improves generalization, and mention one practical caveat when combining it with Batch Normalization.",
        "model": "Dropout randomly disables a subset of neurons on each training pass, which prevents units from co-adapting and relying on specific other units being present, forcing the network to learn more robust, redundant representations — effectively approximating training an ensemble of many thinned sub-networks that are averaged at test time. One practical caveat is that combining Dropout with Batch Normalization can be tricky: Dropout's train/test discrepancy in activation statistics can interact poorly with BatchNorm's running statistics, so many modern architectures order these layers carefully or avoid using both together to prevent variance-shift issues.",
        "points": [
          "prevents co-adaptation of neurons",
          "approximates ensembling of thinned sub-networks",
          "can interact poorly with BatchNorm (variance shift) if not ordered/tuned carefully"
        ],
        "tag": "dropout generalization mechanism"
      }
    ]
  },
  "xavier-init": {
    "mcq": [
      {
        "q": "What problem is Xavier (Glorot) initialization designed to solve?",
        "options": [
          "Vanishing or exploding activations/gradients caused by poor initial weight scaling across layers",
          "Overfitting in convolutional layers",
          "Slow data loading during training",
          "Class imbalance"
        ],
        "answer": 0,
        "explain": "Xavier init chooses weight variance so signal magnitude stays roughly constant across layers, avoiding vanishing/exploding.",
        "tag": "vanishing/exploding signal at init"
      },
      {
        "q": "Xavier initialization sets the variance of weights based on which factor(s)?",
        "options": [
          "Only the number of output units (fan-out)",
          "The number of input and output units of the layer (fan-in and fan-out)",
          "A fixed constant regardless of layer size",
          "The batch size used during training"
        ],
        "answer": 1,
        "explain": "Xavier variance is proportional to 1/(fan_in+fan_out) or similar, balancing forward and backward signal scale.",
        "tag": "fan-in/fan-out variance scaling"
      },
      {
        "q": "Xavier initialization assumes activations are roughly linear around zero (e.g., tanh/sigmoid). For ReLU networks, which initialization is typically preferred instead?",
        "options": [
          "Zero initialization for all weights",
          "Xavier initialization is optimal for ReLU too, no change needed",
          "He (Kaiming) initialization, which accounts for ReLU zeroing out roughly half the activations",
          "Random initialization from a uniform [0,1] range"
        ],
        "answer": 2,
        "explain": "He initialization doubles the variance term to compensate for ReLU zeroing out negative inputs.",
        "tag": "He initialization for ReLU"
      },
      {
        "q": "If all weights in a network are initialized to the exact same value (e.g., all zeros), what problem occurs?",
        "options": [
          "The network trains faster than random init",
          "Gradients explode immediately",
          "No problem occurs as long as biases are randomized",
          "Symmetry breaking fails — all neurons in a layer compute identical gradients and stay identical throughout training"
        ],
        "answer": 3,
        "explain": "Identical weights produce identical gradients for all neurons in a layer, so they never differentiate during training.",
        "tag": "symmetry breaking"
      }
    ],
    "short": [
      {
        "q": "Explain the mathematical intuition behind Xavier initialization's choice of weight variance, and why poor initialization matters more in very deep networks.",
        "model": "Xavier initialization sets each weight's variance to roughly 2/(fan_in + fan_out) so that the variance of activations (and gradients during backprop) stays approximately constant as signals pass forward and backward through layers, preventing them from shrinking toward zero or growing unboundedly. In very deep networks, even small per-layer scaling errors compound multiplicatively across many layers, so a variance slightly below or above the ideal can cause activations to vanish or explode by the time they reach the final layers, making training unstable or impossible without careful initialization.",
        "points": [
          "variance ~2/(fan_in+fan_out) keeps signal scale stable",
          "matches variance of forward activations and backward gradients",
          "small per-layer errors compound across depth in deep nets"
        ],
        "tag": "variance-preserving initialization"
      }
    ]
  },
  "residual-connections": {
    "mcq": [
      {
        "q": "What is the core idea of a residual (skip) connection in a ResNet block?",
        "options": [
          "Adding the block's input directly to its output, so the block learns a residual function F(x) rather than the full mapping H(x)",
          "Concatenating features from all previous layers",
          "Randomly skipping layers during training only",
          "Normalizing the output of each block to zero mean"
        ],
        "answer": 0,
        "explain": "The block computes F(x) and adds x back, so the effective learned mapping is H(x)=F(x)+x.",
        "tag": "residual mapping F(x)=H(x)-x"
      },
      {
        "q": "How do residual connections help mitigate the vanishing gradient problem in very deep networks?",
        "options": [
          "They increase the learning rate automatically",
          "They provide a direct additive path for gradients to flow backward unimpeded through the identity shortcut",
          "They remove the need for backpropagation",
          "They reduce the number of layers needed"
        ],
        "answer": 1,
        "explain": "The identity shortcut lets gradients bypass the non-linear block, flowing directly to earlier layers.",
        "tag": "gradient flow via identity shortcut"
      },
      {
        "q": "Why is it easier for a network to learn an identity mapping using a residual block than using a plain stack of non-linear layers?",
        "options": [
          "Plain layers cannot represent the identity function mathematically",
          "Residual blocks have fewer parameters than plain layers",
          "A residual block can drive F(x) toward zero (e.g., small weights), letting the shortcut alone reproduce x",
          "Residual blocks don't use activation functions"
        ],
        "answer": 2,
        "explain": "Pushing the residual branch's weights near zero makes F(x)≈0, so the block output equals x via the shortcut.",
        "tag": "ease of learning identity mapping"
      },
      {
        "q": "Concatenation-based skip connections (as in DenseNet) differ from additive residual connections (as in ResNet) primarily in what way?",
        "options": [
          "DenseNet skip connections cannot be used with CNNs",
          "ResNet connections require pooling but DenseNet's do not",
          "There is no meaningful difference between the two approaches",
          "DenseNet concatenates feature maps from previous layers (growing channel dimension) rather than summing them element-wise"
        ],
        "answer": 3,
        "explain": "DenseNet stacks (concatenates) channels from earlier layers instead of element-wise adding as ResNet does.",
        "tag": "additive vs concatenative skip connections"
      }
    ],
    "short": [
      {
        "q": "Explain why residual connections enabled training of much deeper networks (e.g., 100+ layers) compared to plain architectures, referencing the degradation problem.",
        "model": "Before ResNets, researchers observed the 'degradation problem': simply stacking more layers in plain networks caused training accuracy to get worse, not from overfitting but because deep plain networks became harder to optimize, as multiple non-linear layers struggled to learn even a simple identity mapping. Residual connections reformulate each block to learn a residual F(x) added to the input x, so if the optimal mapping is close to identity, the network can push F(x) toward zero easily, and gradients can flow directly through the shortcut path during backpropagation without being diminished by many chained non-linear transformations. This combination made it practical to train networks with 50, 101, or even 152+ layers effectively.",
        "points": [
          "degradation problem: deeper plain nets got harder to optimize, not just overfit",
          "shortcut lets block easily represent near-identity mapping",
          "gradients flow directly through identity path, enabling much greater depth"
        ],
        "tag": "degradation problem and depth scaling"
      }
    ]
  },
  "gan": {
    "mcq": [
      {
        "q": "In the standard GAN framework, what is the generator trained to do?",
        "options": [
          "Classify real vs fake samples correctly",
          "Compress input data into a low-dimensional latent code for reconstruction",
          "Produce samples that fool the discriminator into classifying them as real",
          "Directly maximize the discriminator's loss on real data"
        ],
        "answer": 2,
        "explain": "The generator's objective is to produce fake samples the discriminator mistakes for real data.",
        "tag": "generator objective"
      },
      {
        "q": "What does 'mode collapse' refer to in GAN training?",
        "options": [
          "The discriminator becomes too weak to provide useful gradients",
          "The generator produces a limited variety of outputs (or a single mode), failing to capture the full diversity of the data distribution",
          "The training loss oscillates without converging",
          "The generator's weights collapse to zero"
        ],
        "answer": 1,
        "explain": "Mode collapse occurs when the generator narrows in on a few outputs that reliably fool the discriminator.",
        "tag": "mode collapse"
      },
      {
        "q": "In the minimax GAN objective, what does it mean for training to reach a theoretical Nash equilibrium?",
        "options": [
          "The generator perfectly memorizes the training set",
          "The discriminator achieves 100% classification accuracy",
          "The generator and discriminator losses both reach zero simultaneously",
          "The generator's distribution matches the real data distribution such that the discriminator cannot do better than random guessing (50%)"
        ],
        "answer": 3,
        "explain": "At the ideal equilibrium, generated and real distributions are identical, so the discriminator's best accuracy is 50%.",
        "tag": "minimax equilibrium"
      },
      {
        "q": "Why can training a vanilla GAN be unstable, sometimes causing vanishing gradients for the generator early in training?",
        "options": [
          "If the discriminator becomes too good too quickly, it saturates and provides near-zero gradient signal to improve the generator",
          "The generator's learning rate is always set too low",
          "GANs cannot use backpropagation",
          "The generator has more parameters than the discriminator by design"
        ],
        "answer": 0,
        "explain": "A too-strong discriminator confidently rejects fakes, flattening the loss surface the generator relies on for gradients.",
        "tag": "discriminator saturation / training instability"
      }
    ],
    "short": [
      {
        "q": "Explain the adversarial training dynamic between the generator and discriminator in a GAN, and describe one common failure mode.",
        "model": "A GAN consists of a generator that maps random noise to synthetic samples and a discriminator that tries to distinguish real data from the generator's fake samples; the two are trained jointly in a minimax game where the generator improves by better fooling the discriminator, and the discriminator improves by better catching fakes, ideally converging toward the generator producing samples indistinguishable from real data. A common failure mode is mode collapse, where the generator learns to produce only a small subset of plausible outputs (ignoring much of the real data's diversity) because it has found a narrow region that reliably fools the current discriminator, rather than modeling the full data distribution.",
        "points": [
          "generator vs discriminator adversarial minimax game",
          "generator fools discriminator, discriminator distinguishes real/fake",
          "mode collapse: limited output diversity is a common failure"
        ],
        "tag": "adversarial training dynamics"
      }
    ]
  },
  "diffusion-models": {
    "mcq": [
      {
        "q": "What does the forward (diffusion) process in a diffusion model do to the data?",
        "options": [
          "Gradually adds Gaussian noise to the data over many timesteps until it becomes near-pure noise",
          "Compresses the data into a lower-dimensional latent space deterministically",
          "Applies adversarial perturbations to fool a discriminator",
          "Removes noise from the data iteratively"
        ],
        "answer": 0,
        "explain": "The forward process is a fixed Markov chain that progressively corrupts data with Gaussian noise.",
        "tag": "forward noising process"
      },
      {
        "q": "What does the reverse process (typically parameterized by a neural network) learn to do?",
        "options": [
          "Add more noise at each step to increase diversity",
          "Predict and remove noise at each step, gradually denoising from pure noise back toward a data sample",
          "Classify whether an image is real or generated",
          "Encode images into text captions"
        ],
        "answer": 1,
        "explain": "The reverse process is trained to iteratively denoise, reconstructing data-like samples from pure noise.",
        "tag": "reverse denoising process"
      },
      {
        "q": "Compared to GANs, what is a commonly cited advantage of diffusion models for image generation?",
        "options": [
          "They require no training data",
          "They generate samples in a single forward pass, making them faster",
          "More stable training (no adversarial min-max game) and often better sample diversity, avoiding mode collapse",
          "They have far fewer parameters than GANs"
        ],
        "answer": 2,
        "explain": "Diffusion models optimize a likelihood-based denoising objective rather than an adversarial game, improving stability and diversity.",
        "tag": "diffusion vs GAN stability and diversity"
      },
      {
        "q": "What is a major practical drawback of diffusion models relative to GANs or single-pass generative models?",
        "options": [
          "They cannot generate high-resolution images at all",
          "They cannot be conditioned on text or class labels",
          "They require adversarial discriminator networks to train",
          "Sampling requires many sequential denoising steps, making inference significantly slower"
        ],
        "answer": 3,
        "explain": "Generating a sample typically requires iterating the denoising network over many (sometimes hundreds of) timesteps.",
        "tag": "slow iterative sampling"
      }
    ],
    "short": [
      {
        "q": "Describe the two-process structure of a diffusion model (forward and reverse) and explain at a high level what the neural network is trained to predict at each step.",
        "model": "A diffusion model defines a forward process that incrementally corrupts a data sample with Gaussian noise over T timesteps until it becomes indistinguishable from pure noise, and a reverse process that starts from noise and iteratively removes it to reconstruct a data-like sample. The neural network (often a U-Net) is trained, at each timestep, to predict the noise that was added to a noisy sample (or equivalently the clean data or the score/gradient of the log-density), and this predicted noise is subtracted at each reverse step so that repeated denoising gradually transforms random noise into a realistic sample from the learned data distribution.",
        "points": [
          "forward process progressively adds noise until data becomes pure noise",
          "reverse process iteratively denoises starting from noise",
          "network is trained to predict the noise (or clean signal) added at each timestep"
        ],
        "tag": "forward/reverse diffusion process"
      }
    ]
  },
  "gnn": {
    "mcq": [
      {
        "q": "What is the core mechanism most Graph Neural Networks use to update a node's representation?",
        "options": [
          "Convolving over a fixed grid of neighboring pixels",
          "Applying a global attention mechanism across all nodes in the dataset simultaneously",
          "Aggregating (message passing) information from a node's neighbors and combining it with the node's own features",
          "Sorting nodes by degree and applying 1D convolutions"
        ],
        "answer": 2,
        "explain": "GNN layers aggregate neighbor messages and combine them with the node's own features to update its embedding.",
        "tag": "message passing aggregation"
      },
      {
        "q": "Why can't standard CNNs (as used on images) be directly applied to arbitrary graph-structured data?",
        "options": [
          "CNNs cannot use non-linear activations",
          "Graphs generally lack a fixed, regular grid structure and consistent neighbor ordering that convolution over pixels relies on",
          "Graphs never have numeric node features",
          "CNNs require labeled data, but graphs are always unlabeled"
        ],
        "answer": 1,
        "explain": "CNN convolution assumes a fixed grid with ordered neighbors (e.g., pixel grids); graphs have variable, unordered neighborhoods.",
        "tag": "irregular graph structure vs grid"
      },
      {
        "q": "What is 'over-smoothing' in deep GNNs?",
        "options": [
          "A regularization technique to reduce overfitting",
          "The gradient becomes too smooth to compute",
          "The graph structure becomes smoother after training",
          "After many rounds of message passing/layers, node representations become increasingly similar/indistinguishable, losing discriminative information"
        ],
        "answer": 3,
        "explain": "Repeated neighbor averaging across many layers causes node embeddings to converge toward similar values.",
        "tag": "over-smoothing with depth"
      },
      {
        "q": "In an inductive GNN setting (e.g., GraphSAGE), what capability is emphasized compared to a purely transductive approach?",
        "options": [
          "The ability to generalize and generate embeddings for previously unseen nodes/graphs at inference time",
          "The requirement to retrain on the entire graph from scratch for every new node",
          "The inability to use node features, only graph structure",
          "Guaranteed better accuracy than transductive methods on all tasks"
        ],
        "answer": 0,
        "explain": "Inductive methods learn aggregation functions that generalize to new, unseen nodes or graphs without retraining.",
        "tag": "inductive vs transductive learning"
      }
    ],
    "short": [
      {
        "q": "Explain how message passing works in a GNN layer and why stacking too many GNN layers can hurt performance.",
        "model": "In each GNN layer, every node aggregates feature information from its immediate neighbors (e.g., via sum, mean, or attention-weighted combination), combines this aggregated message with its own current representation, and passes it through a learnable transformation (often followed by a non-linearity) to produce an updated node embedding; stacking k layers lets a node incorporate information from nodes up to k hops away. However, stacking too many layers causes over-smoothing: as information from increasingly large and overlapping neighborhoods gets repeatedly averaged together, node representations across the graph converge to similar values, erasing the distinctive local information needed for tasks like node classification.",
        "points": [
          "each layer aggregates neighbor features and combines with own representation",
          "k layers = k-hop receptive field",
          "too many layers cause over-smoothing, making node embeddings indistinguishable"
        ],
        "tag": "message passing and over-smoothing"
      }
    ]
  },
  "embeddings": {
    "mcq": [
      {
        "q": "In an embedding space, what does it typically mean when two word vectors have high cosine similarity?",
        "options": [
          "The words tend to appear in similar contexts and are semantically related",
          "The words have similar character length",
          "The words are antonyms",
          "The words were added to the vocabulary at the same time"
        ],
        "answer": 0,
        "explain": "High cosine similarity indicates the vectors point in similar directions, learned from co-occurring in similar contexts, implying semantic relatedness.",
        "tag": "cosine similarity"
      },
      {
        "q": "What is the key training objective of the word2vec Skip-gram model?",
        "options": [
          "Predict the center word given surrounding context words",
          "Predict surrounding context words given the center word",
          "Classify the sentiment of a sentence",
          "Reconstruct the input sentence token by token"
        ],
        "answer": 1,
        "explain": "Skip-gram takes a center word as input and tries to predict the words in its surrounding context window.",
        "tag": "word2vec skip-gram"
      },
      {
        "q": "Why do contextual embeddings (e.g., from BERT) differ fundamentally from static embeddings (e.g., word2vec/GloVe)?",
        "options": [
          "Contextual embeddings assign one fixed vector per word regardless of usage",
          "Contextual embeddings are always lower-dimensional",
          "Contextual embeddings produce a different vector for the same word depending on surrounding sentence context",
          "Contextual embeddings can only be trained on labeled data"
        ],
        "answer": 2,
        "explain": "Contextual models like BERT compute a token's representation using its surrounding context, so the same word gets different vectors in different sentences.",
        "tag": "contextual vs static"
      },
      {
        "q": "The famous analogy \"king - man + woman ≈ queen\" demonstrates which property of embedding spaces?",
        "options": [
          "Embeddings are always normalized to unit length",
          "Embeddings require a lookup table indexed by frequency rank",
          "Embeddings can only be computed for nouns",
          "Embeddings encode linear relationships that support vector arithmetic over semantic relations"
        ],
        "answer": 3,
        "explain": "This example shows certain semantic relationships (like gender) are captured as roughly consistent directions/offsets in the vector space, enabling arithmetic analogies.",
        "tag": "analogy arithmetic"
      }
    ],
    "short": [
      {
        "q": "Explain why embedding dimensionality is a trade-off, and what happens if it's set too low or too high.",
        "model": "Embedding dimensionality controls how much information each vector can encode; too few dimensions cause distinct concepts to collide (loss of nuance), while too many dimensions increase parameter count and risk overfitting without proportional quality gains. Practitioners typically choose dimensionality based on vocabulary size, downstream task needs, and empirical validation. Common choices range from 100-300 for static embeddings to 768-4096+ for large contextual/LLM embeddings.",
        "points": [
          "low dimensions cause representational collapse/underfitting",
          "high dimensions increase compute/memory and overfitting risk",
          "optimal size depends on vocab size and task, chosen empirically"
        ],
        "tag": "dimensionality trade-off"
      }
    ]
  },
  "tokenizer": {
    "mcq": [
      {
        "q": "What problem does subword tokenization (e.g., BPE) primarily solve compared to word-level tokenization?",
        "options": [
          "It eliminates the need for an embedding layer",
          "It handles out-of-vocabulary words by breaking them into known subword units",
          "It guarantees every token maps to exactly one character",
          "It removes the need for a fixed vocabulary size"
        ],
        "answer": 1,
        "explain": "BPE and similar subword schemes decompose rare/unseen words into smaller known pieces, avoiding the OOV problem that plagues word-level vocabularies.",
        "tag": "BPE subword"
      },
      {
        "q": "How does Byte-Pair Encoding (BPE) build its vocabulary during training?",
        "options": [
          "It randomly samples substrings from the corpus",
          "It splits every word into individual characters and stops there",
          "It iteratively merges the most frequent pair of adjacent symbols until a target vocab size is reached",
          "It uses a pretrained language model to score candidate merges"
        ],
        "answer": 2,
        "explain": "BPE starts from characters/bytes and greedily merges the most frequent adjacent pair repeatedly, building a vocabulary of increasingly larger subword units.",
        "tag": "BPE algorithm"
      },
      {
        "q": "Why can tokenization cause LLMs to struggle with simple character-level tasks (e.g., counting letters in a word)?",
        "options": [
          "The model architecture does not support character inputs at all",
          "Tokenizers always lowercase input before processing",
          "LLMs cannot process numbers as tokens",
          "Words are often split into multi-character subword tokens, so the model never directly sees individual characters"
        ],
        "answer": 3,
        "explain": "Since tokens are often multi-character chunks, the model has no direct access to individual character identities inside a token, making letter-counting or spelling tasks harder.",
        "tag": "tokenization limitations"
      },
      {
        "q": "Compared to word-level tokenizers, subword tokenizers generally produce:",
        "options": [
          "A smaller, fixed-size vocabulary that still generalizes to rare/unseen words",
          "A larger vocabulary and longer sequences",
          "No vocabulary at all since input is used raw",
          "Vocabularies restricted only to whole dictionary words"
        ],
        "answer": 0,
        "explain": "Subword tokenization keeps vocabulary size manageable and fixed while still representing arbitrary strings by composing subword units, unlike word-level vocabularies which balloon or fail on unseen words.",
        "tag": "vocabulary size"
      }
    ],
    "short": [
      {
        "q": "Compare BPE and WordPiece tokenization approaches — what's the key algorithmic difference in how merges are chosen?",
        "model": "Both BPE and WordPiece iteratively build a vocabulary by merging subword units, but they differ in the merge selection criterion. BPE greedily merges the pair of symbols with the highest raw frequency in the corpus. WordPiece instead merges the pair that maximizes the likelihood of the training data under a language model, which can favor different merges than pure frequency. In practice both produce similar subword vocabularies, but WordPiece's likelihood-based criterion is used in BERT while BPE (or byte-level BPE) is used in GPT-style models.",
        "points": [
          "BPE merges highest-frequency adjacent pair",
          "WordPiece merges pair maximizing likelihood gain (frequency normalized by parts)",
          "used by different model families (BERT vs GPT)"
        ],
        "tag": "BPE vs WordPiece"
      }
    ]
  },
  "attention": {
    "mcq": [
      {
        "q": "In scaled dot-product attention, why is the dot product scaled by 1/√d_k?",
        "options": [
          "To speed up matrix multiplication on GPUs",
          "To ensure the attention weights sum to exactly d_k",
          "To keep the softmax input variance stable and prevent extremely peaked gradients as d_k grows",
          "To make the Query and Key matrices the same shape"
        ],
        "answer": 2,
        "explain": "As dimensionality d_k grows, dot products grow in magnitude, pushing softmax into regions with tiny gradients; dividing by √d_k keeps the variance roughly constant regardless of d_k.",
        "tag": "scaled dot-product"
      },
      {
        "q": "What is the purpose of multi-head attention rather than a single attention function?",
        "options": [
          "It reduces the total number of parameters compared to single-head attention",
          "It removes the need for positional encodings",
          "It forces all heads to learn identical attention patterns for redundancy",
          "It allows the model to jointly attend to information from different representation subspaces at different positions"
        ],
        "answer": 3,
        "explain": "Multiple heads project inputs into different learned subspaces, letting each head specialize in capturing different types of relationships simultaneously.",
        "tag": "multi-head attention"
      },
      {
        "q": "In the attention mechanism, what do the Query, Key, and Value vectors represent, conceptually?",
        "options": [
          "Query = what I'm looking for, Key = what each item offers to match against, Value = the content retrieved once matched",
          "Query and Key are always identical vectors while Value is random noise",
          "Value determines the attention weights and Query/Key are discarded after use",
          "Key is only used in decoder self-attention, never in cross-attention"
        ],
        "answer": 0,
        "explain": "The Query represents the current position's information need; Keys are compared against the Query to produce similarity scores; Values are the actual content weighted and summed according to those scores.",
        "tag": "query key value roles"
      },
      {
        "q": "Why does the decoder in an autoregressive Transformer use a causal (masked) attention mask?",
        "options": [
          "To reduce computational cost of the softmax operation",
          "To prevent a position from attending to future tokens, preserving the autoregressive left-to-right generation property",
          "To force the model to attend equally to all positions",
          "To align decoder sequence length with encoder sequence length"
        ],
        "answer": 1,
        "explain": "Masking future positions with -infinity before softmax ensures predictions for position i depend only on known outputs before i, required for valid autoregressive generation.",
        "tag": "causal masking"
      }
    ],
    "short": [
      {
        "q": "Explain why self-attention has O(n²) time/memory complexity with respect to sequence length, and what practical problem this causes.",
        "model": "Self-attention computes a similarity score between every pair of tokens in the sequence, producing an n×n attention matrix; both the compute and memory needed to store this matrix scale quadratically with sequence length n. This makes processing very long sequences expensive and memory-bound, limiting context length in practice. This is the core motivation behind efficient-attention approaches like FlashAttention (IO-aware computation) and sparse/linear attention variants that avoid materializing the full n×n matrix.",
        "points": [
          "attention matrix is n×n, scaling quadratically with sequence length",
          "both compute and memory cost grow as O(n²)",
          "motivates efficient attention methods (FlashAttention, sparse/linear attention) for long context"
        ],
        "tag": "quadratic complexity"
      }
    ]
  },
  "transformers": {
    "mcq": [
      {
        "q": "Why do Transformers need explicit positional encodings/embeddings?",
        "options": [
          "Because the feed-forward layers require sorted inputs",
          "Because positional encodings replace the need for an embedding layer",
          "Because layer normalization only works with ordered inputs",
          "Because self-attention is permutation-invariant and has no inherent notion of token order"
        ],
        "answer": 3,
        "explain": "Self-attention treats input tokens as an unordered set (weights depend only on content similarity), so without positional information the model cannot distinguish token order.",
        "tag": "positional encoding"
      },
      {
        "q": "What is the role of the position-wise feed-forward network (FFN) in each Transformer block?",
        "options": [
          "It applies the same two-layer MLP independently to each token's representation, adding non-linear transformation capacity",
          "It computes attention weights between tokens",
          "It handles tokenization of the raw input text",
          "It normalizes gradients across the batch dimension"
        ],
        "answer": 0,
        "explain": "The FFN is applied identically and independently to each position's vector (no cross-token interaction), providing additional non-linear mixing after attention aggregates cross-token information.",
        "tag": "feed-forward network"
      },
      {
        "q": "Why is a residual (skip) connection used around each sub-layer (attention, FFN) in a Transformer block?",
        "options": [
          "To reduce the number of parameters in the model",
          "To help gradients flow through deep stacks of layers and ease optimization/training stability",
          "To replace the need for layer normalization entirely",
          "To enforce that outputs are always non-negative"
        ],
        "answer": 1,
        "explain": "Residual connections add the sub-layer's input directly to its output, creating shorter gradient paths through the network which mitigates vanishing gradients in deep architectures.",
        "tag": "residual connections"
      },
      {
        "q": "In the original \"Attention Is All You Need\" architecture, layer normalization is applied:",
        "options": [
          "Only once at the very end of the entire network",
          "Only to the embedding layer, never inside Transformer blocks",
          "Around/within each sub-layer (e.g., post-LN after residual add, or pre-LN before sub-layer, depending on variant)",
          "Only during inference, not during training"
        ],
        "answer": 2,
        "explain": "LayerNorm is applied at each sub-layer boundary — the original paper used post-LN (after the residual add), while many modern variants use pre-LN (before the sub-layer) for improved stability.",
        "tag": "layer normalization"
      }
    ],
    "short": [
      {
        "q": "Describe the difference between \"post-LN\" and \"pre-LN\" Transformer designs and why pre-LN became more popular for training very deep/large models.",
        "model": "In post-LN, layer normalization is applied after the residual addition (output = LayerNorm(x + Sublayer(x))), which is what the original Transformer used. In pre-LN, normalization is applied before the sub-layer (output = x + Sublayer(LayerNorm(x))), keeping the residual stream unnormalized end-to-end. Pre-LN gives more stable gradients at initialization for very deep stacks, often reducing the need for learning-rate warmup and allowing larger/deeper models to train more reliably, which is why most modern large-scale LLMs adopt pre-LN or variants like RMSNorm-based pre-norm.",
        "points": [
          "post-LN normalizes after residual add (original paper)",
          "pre-LN normalizes before the sub-layer, keeping residual stream clean",
          "pre-LN improves training stability for deep/large models, reducing warmup sensitivity"
        ],
        "tag": "pre-LN vs post-LN"
      }
    ]
  },
  "encoder-vs-decoder": {
    "mcq": [
      {
        "q": "Which architecture family is best suited for tasks requiring bidirectional understanding of full input context, like sentence classification or extractive QA?",
        "options": [
          "Encoder-only models (e.g., BERT)",
          "Decoder-only (causal) models",
          "Encoder-decoder models used purely for generation",
          "Retrieval-only systems with no neural encoder"
        ],
        "answer": 0,
        "explain": "Encoder-only models like BERT use bidirectional (unmasked) self-attention so every token can see the full input in both directions, ideal for understanding tasks rather than generation.",
        "tag": "encoder-only bidirectional"
      },
      {
        "q": "Why are decoder-only architectures (e.g., GPT-style) dominant for open-ended text generation?",
        "options": [
          "They use bidirectional attention, giving richer context per token",
          "They do not require positional encodings",
          "Their causal masking naturally matches the autoregressive, left-to-right token generation process",
          "They cannot be scaled beyond a few billion parameters"
        ],
        "answer": 2,
        "explain": "Decoder-only models are trained with causal masks that match exactly how text is generated at inference time, simplifying training/inference alignment.",
        "tag": "decoder-only autoregressive"
      },
      {
        "q": "In an encoder-decoder (seq2seq) Transformer like the original translation model, what does the decoder's cross-attention layer attend to?",
        "options": [
          "Only the decoder's own previously generated tokens",
          "Randomly sampled tokens from the vocabulary",
          "The raw input embeddings before any encoder processing",
          "The final hidden states produced by the encoder over the source sequence"
        ],
        "answer": 3,
        "explain": "Cross-attention lets each decoder position query the encoder's output representations, allowing generation to condition on the full (bidirectionally encoded) source sequence.",
        "tag": "cross-attention"
      },
      {
        "q": "Which statement best characterizes the trade-off of encoder-decoder models versus decoder-only models for tasks like machine translation?",
        "options": [
          "Encoder-decoder models cannot be trained with teacher forcing",
          "Encoder-decoder models separate understanding (bidirectional encoder) from generation (causal decoder), which can be advantageous but adds architectural complexity and parameters versus a single decoder-only stack",
          "Decoder-only models are strictly incapable of performing translation",
          "Encoder-decoder models have no attention mechanism between encoder and decoder"
        ],
        "answer": 1,
        "explain": "Encoder-decoder models explicitly separate bidirectional source understanding from autoregressive target generation via cross-attention, at the cost of extra complexity versus a single decoder-only stack.",
        "tag": "architecture trade-offs"
      }
    ],
    "short": [
      {
        "q": "When would you choose an encoder-only model over a decoder-only model for a downstream task, and why?",
        "model": "Choose an encoder-only model like BERT for tasks that need deep bidirectional understanding of a fixed input without generating new text, such as classification, named entity recognition, or extractive question answering — since every token can attend to both left and right context, representations are richer for understanding. Decoder-only models are preferable when the task requires open-ended generation, since their causal structure matches autoregressive decoding. Encoder-only models are also typically cheaper to run for understanding tasks since they don't need iterative token-by-token decoding.",
        "points": [
          "encoder-only suits classification/extraction tasks needing full bidirectional context",
          "decoder-only suits open-ended generation due to causal/autoregressive match",
          "encoder-only avoids costly iterative decoding for non-generative tasks"
        ],
        "tag": "architecture selection"
      }
    ]
  },
  "LLM": {
    "mcq": [
      {
        "q": "What is the primary pretraining objective for most modern decoder-only LLMs (e.g., GPT family)?",
        "options": [
          "Masked language modeling: predict randomly masked tokens using bidirectional context",
          "Next-token prediction: predict the next token given all previous tokens in the sequence",
          "Contrastive learning between paired sentences",
          "Sentence-order prediction between shuffled paragraphs"
        ],
        "answer": 1,
        "explain": "Decoder-only LLMs are trained with a simple autoregressive objective — maximize the likelihood of the next token given prior tokens — applied at massive scale over web-scale text corpora.",
        "tag": "next-token prediction"
      },
      {
        "q": "What does the term \"emergent ability\" refer to in the context of scaling LLMs?",
        "options": [
          "A capability present in all model sizes but only documented in large models",
          "A bug that emerges only during multi-GPU training",
          "The ability to emerge from training checkpoints without fine-tuning",
          "A capability that appears abruptly at a certain scale and is largely absent or near-random in smaller models"
        ],
        "answer": 3,
        "explain": "Emergent abilities are those where performance is near chance for smaller models but jumps sharply once a model crosses a scale threshold, rather than improving smoothly.",
        "tag": "emergent abilities"
      },
      {
        "q": "What is the main purpose of instruction tuning / RLHF applied after pretraining an LLM?",
        "options": [
          "To align the model's outputs with human preferences/instructions, improving helpfulness and reducing undesired behaviors",
          "To increase the raw pretraining corpus size",
          "To reduce the model's parameter count for deployment",
          "To replace the tokenizer with a smaller vocabulary"
        ],
        "answer": 0,
        "explain": "Pretrained base models predict plausible text continuations but aren't necessarily helpful or safe; instruction tuning and RLHF align the model with desired assistant behavior.",
        "tag": "RLHF alignment"
      },
      {
        "q": "According to scaling laws research (e.g., Chinchilla), for a fixed compute budget, what is a key finding about balancing model size and training data?",
        "options": [
          "Model size should always be maximized regardless of data size",
          "Data quantity is irrelevant as long as model size is large enough",
          "Compute-optimal training requires scaling model parameters and training tokens roughly in tandem, and many earlier large models were undertrained relative to their size",
          "Training tokens should always be fixed at exactly 1 trillion regardless of model size"
        ],
        "answer": 2,
        "explain": "Chinchilla scaling laws showed many large models were undertrained for their parameter count, and that model size and data size should scale together roughly proportionally for compute-optimal training.",
        "tag": "scaling laws"
      }
    ],
    "short": [
      {
        "q": "Explain the difference between a \"base\" (pretrained) LLM and an \"instruction-tuned\"/\"chat\" LLM, and why the latter is typically preferred for user-facing assistant products.",
        "model": "A base LLM is trained only with next-token prediction on broad text corpora, so it tends to continue text in whatever style is statistically likely, without a strong notion of following instructions or being helpful/safe. An instruction-tuned or chat model takes that base model and further fine-tunes it (via supervised fine-tuning on instruction-response pairs and often RLHF/DPO on human preference data) to reliably follow user instructions, refuse harmful requests, and produce responses in a consistent, helpful assistant style. User-facing products prefer instruction-tuned models because they behave predictably as assistants rather than requiring careful prompt engineering to coax desired behavior out of a raw completion model.",
        "points": [
          "base model only does next-token continuation, no inherent instruction-following",
          "instruction-tuned model adds SFT + RLHF/DPO on instruction/preference data",
          "instruction-tuned models are more predictable/helpful/safe for assistant use cases"
        ],
        "tag": "base vs instruction-tuned"
      }
    ]
  },
  "mixture-of-experts": {
    "mcq": [
      {
        "q": "In a Mixture-of-Experts (MoE) Transformer layer, what does the gating/router network do?",
        "options": [
          "It computes the final output by averaging all experts equally regardless of input",
          "It replaces the attention mechanism entirely",
          "It selects/weights a small subset of expert sub-networks to process each token, based on the token's representation",
          "It determines the learning rate for each expert during training"
        ],
        "answer": 2,
        "explain": "The router is a learned function that, per token, decides which expert(s) (typically top-k) should process that token and with what weight, enabling conditional computation.",
        "tag": "gating router"
      },
      {
        "q": "What is the main efficiency benefit of MoE models compared to equally-sized dense models?",
        "options": [
          "MoE models activate only a fraction of total parameters per token, so they can have a much larger total parameter count while keeping per-token inference/training FLOPs similar to a smaller dense model",
          "MoE models have fewer total parameters than a dense model of the same active compute",
          "MoE models eliminate the need for a router entirely at inference time",
          "MoE models always use less GPU memory than dense models of the same active parameter count"
        ],
        "answer": 0,
        "explain": "Sparse activation means only top-k experts run per token, so the model can scale total capacity far beyond a dense model at the same compute cost per token — though memory footprint from storing all experts remains large.",
        "tag": "sparse activation efficiency"
      },
      {
        "q": "What is a well-known training challenge specific to MoE models, and a common mitigation?",
        "options": [
          "Vanishing gradients in the embedding layer, mitigated by residual connections",
          "Overly slow softmax computation, mitigated by removing the softmax entirely",
          "Tokenizer mismatch between experts, mitigated by using separate tokenizers per expert",
          "Load imbalance where the router sends most tokens to a few experts, mitigated by auxiliary load-balancing losses"
        ],
        "answer": 3,
        "explain": "Without intervention, routers can collapse to favoring a few experts; a common fix is an auxiliary load-balancing loss encouraging roughly uniform token distribution across experts.",
        "tag": "load balancing"
      },
      {
        "q": "In top-k expert routing (e.g., top-2 MoE), what does \"top-k\" refer to?",
        "options": [
          "The number of Transformer layers that contain MoE blocks",
          "The number of experts each token is routed to and whose outputs are combined (weighted by router scores)",
          "The number of tokens each expert can process per batch",
          "The number of attention heads used within each expert"
        ],
        "answer": 1,
        "explain": "Top-k routing means each token's representation is sent to the k highest-scoring experts (commonly k=1 or 2), and their outputs are combined to form the layer's output.",
        "tag": "top-k routing"
      }
    ],
    "short": [
      {
        "q": "Explain the trade-off MoE models make between total parameter count and active (compute) parameter count, and why this matters for both training/inference cost and memory requirements.",
        "model": "MoE models decouple total parameter count from the compute cost per token: a model might have hundreds of billions of total parameters spread across many experts, but each token only activates a small subset (e.g., 2 experts per MoE layer), so the FLOPs per token resemble a much smaller dense model. This gives more model capacity without proportionally increasing compute cost per token, which is great for training/inference speed. However, all experts' weights typically still need to be held in memory even though only a few are used per token, so memory footprint and deployment cost don't shrink correspondingly — this is the classic MoE trade-off of compute savings without memory savings.",
        "points": [
          "total parameters can be much larger than active parameters per token",
          "compute cost per token scales with active parameters, not total",
          "memory footprint still scales with total parameters, limiting the win"
        ],
        "tag": "parameter efficiency trade-off"
      }
    ]
  },
  "token-sampling": {
    "mcq": [
      {
        "q": "What does temperature control when sampling tokens from an LLM's output distribution?",
        "options": [
          "The maximum number of tokens generated",
          "Whether the model uses beam search or greedy decoding",
          "The size of the vocabulary considered at each step",
          "How peaked or flat the probability distribution is before sampling — low temperature sharpens toward the most likely tokens, high temperature flattens it toward more uniform/random choices"
        ],
        "answer": 3,
        "explain": "Temperature rescales the logits before softmax; a low temperature (<1) sharpens the distribution, while a high temperature (>1) flattens it toward more uniform sampling.",
        "tag": "temperature sampling"
      },
      {
        "q": "How does top-k sampling differ from top-p (nucleus) sampling?",
        "options": [
          "Top-k always considers the entire vocabulary; top-p considers only two tokens",
          "Top-k restricts sampling to a fixed number of highest-probability tokens; top-p restricts to the smallest set of tokens whose cumulative probability exceeds a threshold p, so the candidate set size adapts per step",
          "Top-k and top-p are mathematically identical procedures",
          "Top-p is deterministic while top-k is always random"
        ],
        "answer": 1,
        "explain": "Top-k always keeps exactly k candidates regardless of distribution shape, whereas top-p dynamically adjusts the candidate pool size based on cumulative probability mass.",
        "tag": "top-k vs top-p"
      },
      {
        "q": "What is the main drawback of using pure greedy decoding (always pick the single highest-probability token) for open-ended text generation?",
        "options": [
          "It is prohibitively slow compared to sampling methods",
          "It cannot be used with decoder-only models",
          "It often produces repetitive, generic, or degenerate text because it never explores lower-probability but plausible alternatives",
          "It requires significantly more GPU memory than sampling"
        ],
        "answer": 2,
        "explain": "Greedy decoding locally maximizes probability at each step, which frequently leads to bland, repetitive loops in open-ended generation.",
        "tag": "greedy decoding pitfalls"
      },
      {
        "q": "In beam search decoding, what does increasing the beam width (number of beams) generally trade off?",
        "options": [
          "Higher compute/memory cost in exchange for exploring more candidate sequences, which can improve output quality for tasks with a single \"correct\" answer but can hurt diversity/naturalness in open-ended generation",
          "Lower memory/compute cost but worse quality output",
          "No effect on either compute cost or output quality",
          "Beam width only affects the tokenizer's vocabulary size"
        ],
        "answer": 0,
        "explain": "More beams means tracking more partial hypotheses simultaneously (higher compute/memory), which can find higher-likelihood sequences but can reduce diversity in open-ended generation.",
        "tag": "beam search trade-offs"
      }
    ],
    "short": [
      {
        "q": "Why might combining top-p (nucleus) sampling with a moderate temperature produce better creative text generation than either greedy decoding or unconstrained random sampling alone?",
        "model": "Greedy decoding is fully deterministic and tends to produce repetitive, generic text because it never considers alternatives to the single most likely token. Unconstrained random sampling over the full vocabulary risks occasionally picking very low-probability, incoherent tokens from the distribution's long tail. Top-p sampling restricts candidates to a dynamically-sized set covering most of the probability mass, cutting off the unreliable tail, while temperature adjusts how sharply peaked that restricted distribution is; combined, they let the model choose among plausible, reasonably likely continuations with controlled randomness, balancing coherence and creative diversity better than either extreme alone.",
        "points": [
          "greedy decoding is deterministic and prone to repetition/genericness",
          "pure random sampling risks selecting incoherent low-probability tail tokens",
          "top-p + temperature together trim the tail while tuning randomness for coherent diversity"
        ],
        "tag": "sampling strategy combination"
      }
    ]
  },
  "flashattention": {
    "mcq": [
      {
        "q": "What is the core insight behind FlashAttention's speedup over standard attention implementations?",
        "options": [
          "It is an IO-aware algorithm that minimizes slow HBM memory reads/writes by tiling computation and keeping intermediate results in fast on-chip SRAM",
          "It reduces the mathematical number of floating-point operations required for attention",
          "It approximates attention scores using a lower-precision sparse matrix",
          "It removes the softmax operation entirely to save compute"
        ],
        "answer": 0,
        "explain": "FlashAttention doesn't reduce FLOPs — its speedup comes from being IO-aware, using tiling/fusion to avoid materializing the full N×N attention matrix in slow HBM, keeping data in fast SRAM instead.",
        "tag": "IO-aware tiling"
      },
      {
        "q": "Does FlashAttention change the mathematical result of the attention computation compared to standard (naive) attention?",
        "options": [
          "Yes, it computes an approximate attention using randomized projections",
          "Yes, it only computes attention for a random subset of tokens",
          "No, but it changes the attention mechanism to be linear instead of quadratic in FLOPs",
          "No, FlashAttention computes mathematically exact/equivalent attention output — it only changes how the computation is scheduled and memory is accessed"
        ],
        "answer": 3,
        "explain": "FlashAttention is an exact algorithm (not an approximation) — it produces numerically equivalent outputs to standard attention while being much faster and more memory-efficient.",
        "tag": "exact vs approximate"
      },
      {
        "q": "What memory complexity does FlashAttention achieve for the attention operation with respect to sequence length n, compared to standard attention's O(n²) memory?",
        "options": [
          "FlashAttention still requires O(n²) memory, identical to standard attention",
          "FlashAttention reduces memory to O(n) by avoiding materialization of the full n×n attention matrix, using online softmax with running statistics",
          "FlashAttention requires O(n³) memory due to extra bookkeeping",
          "FlashAttention eliminates memory usage entirely by computing attention analytically"
        ],
        "answer": 1,
        "explain": "By processing the attention matrix in blocks/tiles and maintaining running max/sum statistics (online softmax) instead of storing the full n×n score matrix, FlashAttention achieves linear memory in sequence length.",
        "tag": "memory complexity"
      },
      {
        "q": "Why does FlashAttention specifically target the GPU memory hierarchy (HBM vs SRAM) rather than just optimizing raw compute (FLOPs)?",
        "options": [
          "Because attention is compute-bound, not memory-bound, so FLOP reduction is irrelevant",
          "Because GPUs do not have a memory hierarchy relevant to attention",
          "Because standard attention implementations are memory-bandwidth-bound — the bottleneck is repeatedly reading/writing large intermediate matrices to slow HBM, not the arithmetic itself",
          "Because SRAM is slower than HBM, so avoiding it improves speed"
        ],
        "answer": 2,
        "explain": "Naive attention implementations spend most of their wall-clock time moving data between slow HBM and compute units; FlashAttention fuses operations and tiles data to maximize reuse of fast on-chip SRAM.",
        "tag": "memory bandwidth bottleneck"
      }
    ],
    "short": [
      {
        "q": "Explain what \"online softmax\" is and why it's essential to how FlashAttention achieves linear memory usage.",
        "model": "Online softmax computes the softmax normalization incrementally over blocks of the input rather than requiring the entire row of scores to be materialized at once. As FlashAttention processes the key/value sequence in tiles, it maintains running statistics — the current maximum score and a running sum of exponentials — and rescales previously accumulated output whenever a new block reveals a larger max, allowing the final normalized softmax output to be computed correctly without ever storing the full n×n score matrix. This block-wise incremental computation is what lets memory usage scale linearly with sequence length instead of quadratically.",
        "points": [
          "computes softmax incrementally per tile using running max and running sum",
          "rescales accumulated results when a new larger max is found, preserving numerical correctness",
          "avoids ever materializing the full n×n score matrix, enabling O(n) memory"
        ],
        "tag": "online softmax"
      }
    ]
  },
  "state-space-models": {
    "mcq": [
      {
        "q": "What is the central computational advantage of state-space models like Mamba over standard Transformer attention for long sequences?",
        "options": [
          "They use quadratic attention but with a smaller constant factor",
          "They process sequences with linear (not quadratic) time/memory complexity with respect to sequence length via a recurrent-style state update",
          "They eliminate the need for any form of gating or selection mechanism",
          "They require no training data and are purely rule-based"
        ],
        "answer": 1,
        "explain": "SSMs maintain a fixed-size hidden state updated recurrently (or via an equivalent convolution), giving linear scaling in sequence length rather than the quadratic cost of full self-attention.",
        "tag": "linear scaling"
      },
      {
        "q": "What key innovation does Mamba introduce compared to earlier (non-selective) state-space models like S4?",
        "options": [
          "Input-dependent (selective) parameters, letting the model dynamically decide what information to keep or discard in its hidden state based on the current input",
          "A fully quadratic attention mechanism replacing the SSM entirely",
          "Removing the hidden state entirely in favor of raw token embeddings",
          "Restricting the model to only process fixed-length sequences"
        ],
        "answer": 0,
        "explain": "Mamba's selective SSM makes its transition/input parameters functions of the input at each timestep, enabling content-based reasoning rather than the fixed, input-independent dynamics of earlier linear SSMs.",
        "tag": "selective SSM"
      },
      {
        "q": "What is a commonly cited limitation of SSM-based models compared to attention-based Transformers?",
        "options": [
          "SSMs cannot be trained on GPUs",
          "SSMs always require more parameters than equivalently-sized Transformers",
          "SSMs can struggle with tasks requiring precise recall of specific far-back tokens (in-context retrieval/copying), since information is compressed into a fixed-size recurrent state rather than kept as explicit per-token memory",
          "SSMs cannot process sequences longer than 512 tokens"
        ],
        "answer": 2,
        "explain": "Because SSMs compress history into a fixed-size state (unlike attention, which can look back at any specific past token via the KV cache), they can underperform on tasks needing exact recall/copying of arbitrary earlier tokens.",
        "tag": "recall limitations"
      },
      {
        "q": "During inference/generation, how does an SSM's per-step compute/memory cost compare to a Transformer using a KV cache?",
        "options": [
          "SSMs require storing a KV cache that grows with sequence length, just like Transformers",
          "SSMs cannot perform autoregressive generation at all",
          "SSMs require recomputing the entire sequence from scratch at every generation step",
          "SSMs maintain a fixed-size hidden state per step, giving constant per-step memory/compute regardless of how long the sequence has grown, unlike a Transformer's KV cache which grows linearly with sequence length"
        ],
        "answer": 3,
        "explain": "An SSM's recurrent state is fixed-size, so each new-token generation step costs constant time/memory; a Transformer's KV cache accumulates entries per generated token, growing memory linearly with sequence length.",
        "tag": "constant-memory inference"
      }
    ],
    "short": [
      {
        "q": "Explain the core trade-off between Transformers (attention) and state-space models (Mamba) in terms of sequence-length scaling versus exact recall ability.",
        "model": "Transformers use self-attention which lets every token directly attend to every other token, giving strong exact-recall/retrieval ability via its KV cache but at O(n²) time and growing memory cost as sequence length increases. State-space models like Mamba instead compress the entire history into a fixed-size recurrent state updated in linear time, giving much better scaling to long sequences and constant per-step inference memory, but this compression means precise information about specific far-back tokens can be lost or blended, hurting tasks that need exact copying/retrieval from long contexts. This has led to hybrid architectures that combine SSM layers with occasional attention layers to get both efficiency and recall.",
        "points": [
          "attention gives exact per-token recall via direct pairwise comparison but scales quadratically",
          "SSMs compress history into fixed-size state, scaling linearly but losing precise long-range recall",
          "hybrid SSM+attention architectures aim to combine both strengths"
        ],
        "tag": "attention vs SSM trade-off"
      }
    ]
  },
  "context-length-extension": {
    "mcq": [
      {
        "q": "Why do models trained with a fixed maximum context length (e.g., via absolute or rotary positional encodings) often degrade in quality when naively run on much longer sequences at inference time?",
        "options": [
          "The vocabulary changes for longer sequences",
          "Longer sequences always contain more out-of-vocabulary tokens",
          "The positional encoding scheme extrapolates poorly to position values/ranges never seen during training",
          "The attention mechanism physically cannot compute scores beyond the trained length"
        ],
        "answer": 2,
        "explain": "Positional encodings are typically only well-calibrated for the range of positions seen during training; extrapolating to unseen, larger position indices can produce out-of-distribution signals that degrade performance.",
        "tag": "positional extrapolation"
      },
      {
        "q": "What is the core idea behind \"position interpolation\" methods for extending RoPE-based models' context length?",
        "options": [
          "Randomly permuting token positions during fine-tuning",
          "Rescaling/compressing position indices so that the extended context's positions map into the range of position values the model saw during original training, rather than extrapolating beyond it",
          "Removing positional encodings entirely for long sequences",
          "Increasing the model's vocabulary size to accommodate longer sequences"
        ],
        "answer": 1,
        "explain": "Position interpolation linearly rescales position indices so a longer sequence's positions land within the original trained range, turning extrapolation into interpolation, which models handle better.",
        "tag": "position interpolation"
      },
      {
        "q": "Besides positional encoding tricks, what other major bottleneck limits practical context length extension for serving LLMs?",
        "options": [
          "The embedding layer must be retrained from scratch for any new length",
          "Longer contexts require a completely different tokenizer",
          "The softmax function cannot be computed for sequences longer than 4096 tokens",
          "The KV cache memory grows linearly (or more) with sequence length, so very long contexts require large amounts of GPU memory during inference"
        ],
        "answer": 3,
        "explain": "Even if a model attends correctly to very long contexts, storing the key/value cache for every token/layer/head consumes memory that scales with sequence length, becoming a major practical constraint.",
        "tag": "KV cache memory"
      },
      {
        "q": "What distinguishes \"context length extension via fine-tuning\" from purely training-free methods like NTK-aware RoPE scaling or position interpolation?",
        "options": [
          "Fine-tuning-based methods further train the model (often briefly, on long-sequence data) to adapt its weights to the new position/attention distribution, whereas training-free methods only modify the positional encoding math at inference time without updating weights",
          "Fine-tuning-based methods require no additional training data or compute at all",
          "Training-free methods always outperform fine-tuning methods in every case",
          "Fine-tuning methods can only be applied to encoder-only models"
        ],
        "answer": 0,
        "explain": "Training-free approaches adjust how positions/frequencies are computed without touching weights, offering a cheap fix; fine-tuning-based extension actually updates weights on longer sequences, typically yielding better long-context quality at higher compute cost.",
        "tag": "fine-tuning vs training-free"
      }
    ],
    "short": [
      {
        "q": "Why is simply \"training on longer sequences from scratch\" often impractical as the default way to get long-context LLMs, motivating extension techniques instead?",
        "model": "Training a model from scratch on very long sequences is extremely expensive because attention's compute/memory scales quadratically (or requires large KV caches) with sequence length, and high-quality naturally-long training examples are relatively scarce compared to shorter documents. Post-hoc context extension techniques (position interpolation, NTK-aware scaling, long-context fine-tuning) let practitioners take an already-expensive pretrained short-context model and cheaply adapt it to longer contexts using far less compute and data than full long-context pretraining would require, making long-context capability far more accessible.",
        "points": [
          "full long-context pretraining is compute/memory expensive due to quadratic attention costs",
          "long, high-quality training documents are relatively scarce",
          "extension techniques adapt an existing short-context model cheaply instead of retraining from scratch"
        ],
        "tag": "pretraining cost motivation"
      }
    ]
  },
  "speculative-decoding": {
    "mcq": [
      {
        "q": "What is the core idea behind speculative decoding for speeding up LLM inference?",
        "options": [
          "Skipping the softmax computation to save time",
          "Reducing the model's parameter count permanently before inference",
          "Running the large model at a lower numerical precision for every token",
          "A small, fast \"draft\" model proposes several candidate tokens ahead, which the large target model then verifies in a single parallel forward pass, accepting matching tokens and only falling back to the large model where they diverge"
        ],
        "answer": 3,
        "explain": "Speculative decoding uses a cheap draft model to generate candidate tokens, then verifies them all at once with the expensive target model in parallel, saving the cost of a full autoregressive step per token.",
        "tag": "draft-target verification"
      },
      {
        "q": "Does speculative decoding change the final output distribution/quality compared to running the large model alone token-by-token?",
        "options": [
          "Yes, it always produces lower-quality output because the draft model is weaker",
          "Yes, but only improves quality, never preserves the original distribution",
          "No — with proper rejection sampling, speculative decoding produces outputs from the exact same distribution as the target model alone, only faster",
          "No, but it only works if the draft and target models are identical in size"
        ],
        "answer": 2,
        "explain": "Speculative decoding uses a modified acceptance/rejection sampling scheme so the sequence of accepted+resampled tokens matches exactly what the target model would have generated alone — a lossless speedup.",
        "tag": "lossless speedup"
      },
      {
        "q": "What factor most directly determines the speedup achievable from speculative decoding?",
        "options": [
          "The acceptance rate — how often the draft model's proposed tokens agree with what the target model would have generated, combined with the relative cost of the draft vs. target model",
          "The vocabulary size of the tokenizer",
          "The number of attention heads in the target model",
          "The temperature setting used only for the target model"
        ],
        "answer": 0,
        "explain": "Speedup depends on how many draft tokens get accepted per verification pass and how cheap the draft model is relative to the target — low acceptance or an expensive draft model erodes the benefit.",
        "tag": "acceptance rate"
      },
      {
        "q": "Why must the draft model's verification step still involve a forward pass through the large target model?",
        "options": [
          "It doesn't — speculative decoding fully bypasses the target model",
          "The target model must score/verify the draft-proposed tokens (in one parallel pass over the drafted continuation) to guarantee the final output matches its own distribution",
          "The target model is only used to generate the very first token of the sequence",
          "The draft model's tokens are always accepted without any check by the target model"
        ],
        "answer": 1,
        "explain": "To preserve output-distribution correctness, the large target model computes probabilities for the draft-proposed sequence in one batched forward pass, comparing them against the draft model's probabilities to decide acceptance.",
        "tag": "verification pass"
      }
    ],
    "short": [
      {
        "q": "Explain why speculative decoding gives a wall-clock speedup even though the total amount of computation (FLOPs) done by the target model doesn't necessarily decrease.",
        "model": "Autoregressive LLM inference is typically memory-bandwidth-bound rather than compute-bound at small batch sizes — generating one token at a time underutilizes the GPU because each forward pass mostly waits on loading model weights from memory rather than saturating compute. Speculative decoding restructures the same total target-model computation into fewer, larger batched forward passes (verifying multiple draft tokens at once), which better utilizes available compute/memory bandwidth per pass and yields more accepted tokens per expensive step. So even though total FLOPs for the target model stay similar, wall-clock latency drops because expensive passes are amortized across multiple output tokens instead of one token per pass.",
        "points": [
          "single-token autoregressive decoding is memory-bandwidth-bound, underutilizing GPU compute",
          "verifying several draft tokens per target forward pass amortizes that expensive pass over multiple output tokens",
          "wall-clock speedup comes from better hardware utilization per step, not fewer target FLOPs overall"
        ],
        "tag": "memory-bandwidth bound inference"
      }
    ]
  },
  "fine-tuning-models": {
    "mcq": [
      {
        "q": "Full fine-tuning of an LLM updates which parameters?",
        "options": [
          "All model parameters",
          "Only the embedding layer",
          "Only a small set of adapter parameters inserted into each layer",
          "Only the final classification head"
        ],
        "answer": 0,
        "explain": "Full fine-tuning back-propagates through and updates every weight in the pretrained model on the new task data.",
        "tag": "full fine-tuning"
      },
      {
        "q": "Why is catastrophic forgetting a common risk when fine-tuning an LLM on a narrow domain dataset?",
        "options": [
          "The optimizer learning rate becomes zero",
          "The model's tokenizer vocabulary is reset",
          "Fine-tuning always freezes all layers so no learning occurs",
          "Gradient updates on the narrow distribution can overwrite general capabilities learned during pretraining"
        ],
        "answer": 3,
        "explain": "Repeated gradient steps on a narrow distribution can shift weights away from the broad pretrained solution, degrading unrelated capabilities.",
        "tag": "catastrophic forgetting"
      },
      {
        "q": "Which scenario is the best fit for fine-tuning rather than prompting/RAG?",
        "options": [
          "Need the model to answer questions about documents updated hourly",
          "Need to cite exact sources for factual claims",
          "Need to teach the model a stable, well-defined behavior/style/format across many similar requests where in-context examples are insufficient",
          "Need to reduce inference latency without changing model behavior"
        ],
        "answer": 2,
        "explain": "Fine-tuning bakes in consistent, stable behavior/format; fast-changing knowledge or source citation are better served by RAG.",
        "tag": "fine-tuning vs RAG/prompting"
      },
      {
        "q": "In instruction fine-tuning (SFT), what is the training objective typically applied to?",
        "options": [
          "Contrastive loss between positive/negative pairs",
          "Next-token prediction loss computed only over the response tokens (prompt masked out)",
          "Reward model score maximization via PPO",
          "Reconstruction loss on masked input tokens (MLM)"
        ],
        "answer": 1,
        "explain": "SFT uses standard causal LM cross-entropy loss on the response tokens, with the prompt masked so loss isn't computed on the instruction.",
        "tag": "SFT objective"
      }
    ],
    "short": [
      {
        "q": "Explain the difference between full fine-tuning and instruction (SFT) fine-tuning, and describe one key risk of fine-tuning a large pretrained model on a small dataset.",
        "model": "Full fine-tuning updates all of a pretrained model's weights on a downstream task/dataset, while instruction fine-tuning (SFT) is a specific application where the model is trained on (instruction, response) pairs using next-token prediction loss on the response, to make the base model better at following instructions/chat format. A key risk of fine-tuning on a small dataset is overfitting/catastrophic forgetting: because the dataset is small relative to model capacity, the model can memorize it or drift away from its general pretrained capabilities, degrading performance on tasks not represented in the fine-tuning set.",
        "points": [
          "full fine-tuning updates all weights",
          "SFT trains on instruction/response pairs with loss masked to response tokens",
          "small-data fine-tuning risks overfitting/catastrophic forgetting of general capability"
        ],
        "tag": "fine-tuning fundamentals"
      }
    ]
  },
  "parameter-efficient-fine-tuning": {
    "mcq": [
      {
        "q": "What is the core idea behind LoRA (Low-Rank Adaptation)?",
        "options": [
          "Freeze the pretrained weights and learn a low-rank decomposition (two small matrices) added to selected weight matrices",
          "Prune 90% of the weights and retrain the rest",
          "Replace the attention mechanism with a low-rank kernel approximation",
          "Quantize all weights to 4-bit precision before training"
        ],
        "answer": 0,
        "explain": "LoRA freezes the base weight matrix W and learns a low-rank update BA that is added to it, drastically cutting trainable parameters.",
        "tag": "LoRA mechanism"
      },
      {
        "q": "In LoRA, increasing the rank r generally does what?",
        "options": [
          "Decreases the number of trainable parameters and increases model expressivity simultaneously",
          "Has no effect on trainable parameter count, only on learning rate",
          "Increases the number of trainable parameters, allowing more expressive updates but with diminishing returns and higher overfitting/memory cost",
          "Converts the adapter into a full fine-tune automatically once r equals the hidden size"
        ],
        "answer": 2,
        "explain": "A higher rank gives the low-rank update more capacity but adds parameters/compute, with returns typically diminishing past a point.",
        "tag": "LoRA rank"
      },
      {
        "q": "Why can LoRA adapters be merged into the base model weights after training with zero added inference latency?",
        "options": [
          "Because LoRA uses reinforcement learning which requires no extra layers",
          "Because the low-rank update BA is added to the frozen weight W to form W' = W + BA, which is a plain matrix addition, so the merged weights can be used directly like the original",
          "Because LoRA only modifies the tokenizer, not the weight matrices",
          "Because inference always runs the adapter and base weights in parallel on separate GPUs"
        ],
        "answer": 1,
        "explain": "Since the adapted weight is just W + BA, the sum can be precomputed once and used as a normal dense weight matrix at inference.",
        "tag": "LoRA inference merging"
      },
      {
        "q": "Compared to full fine-tuning, what is the main practical advantage of LoRA and other PEFT methods?",
        "options": [
          "They always achieve strictly higher accuracy than full fine-tuning",
          "They eliminate the need for any labeled training data",
          "They remove the need for a pretrained base model entirely",
          "They drastically reduce trainable parameters, memory/optimizer state, and storage per task (multiple small adapters vs. multiple full model copies)"
        ],
        "answer": 3,
        "explain": "PEFT methods train a tiny fraction of parameters, cutting optimizer memory and letting many task-specific adapters share one frozen base model.",
        "tag": "PEFT efficiency"
      }
    ],
    "short": [
      {
        "q": "Describe how LoRA reduces the memory/compute cost of fine-tuning compared to full fine-tuning, and mention one hyperparameter that controls the trade-off between adapter capacity and efficiency.",
        "model": "LoRA freezes the original pretrained weight matrices and injects a pair of small low-rank matrices (B and A, with rank r much smaller than the hidden dimension) whose product approximates the weight update, so gradients and optimizer states are tracked only for these much smaller matrices instead of the full weight matrix. This drastically cuts trainable parameter count, GPU memory for gradients/optimizer states, and per-task storage, since only the small adapter needs to be saved per task. The rank r is the key hyperparameter: a higher r increases adapter capacity/expressivity but adds more trainable parameters and overfitting risk, while a lower r is more efficient but may underfit complex tasks.",
        "points": [
          "freezes base weights, learns low-rank BA update",
          "reduces trainable params/optimizer state/storage vs full fine-tuning",
          "rank r trades off capacity vs efficiency"
        ],
        "tag": "LoRA efficiency trade-off"
      }
    ]
  },
  "preference-optimization": {
    "mcq": [
      {
        "q": "In classic RLHF (as used for InstructGPT/ChatGPT), what is the role of the reward model?",
        "options": [
          "It generates the training prompts used for SFT",
          "It is trained on human preference comparisons to predict a scalar reward for a given response, which is then used as the optimization signal for RL (e.g., PPO)",
          "It replaces the policy model entirely during inference",
          "It performs the final greedy decoding of responses"
        ],
        "answer": 1,
        "explain": "The reward model learns from pairwise human preference data to score responses, and PPO optimizes the policy against that score.",
        "tag": "reward model"
      },
      {
        "q": "What does DPO (Direct Preference Optimization) avoid that standard RLHF with PPO requires?",
        "options": [
          "The need for any human preference data at all",
          "The need for a pretrained base/SFT model to start from",
          "Training a separate reward model and running unstable online RL; DPO instead optimizes a closed-form loss directly on preference pairs",
          "The need for a KL-divergence constraint to the reference policy"
        ],
        "answer": 2,
        "explain": "DPO reformulates the RLHF objective so the optimal policy follows in closed form from preference data, skipping the reward model and PPO rollouts.",
        "tag": "DPO vs PPO"
      },
      {
        "q": "Why does RLHF (and DPO) typically include a KL-divergence penalty/constraint against a reference (usually the SFT) policy?",
        "options": [
          "To speed up tokenization",
          "To ensure the reward model is deterministic",
          "To reduce the number of human preference labels needed",
          "To prevent the policy from drifting too far from the reference model and 'reward hacking' or collapsing into degenerate outputs that exploit the reward model"
        ],
        "answer": 3,
        "explain": "The KL term keeps the optimized policy close to the reference model so it can't exploit reward model blind spots or degrade fluency.",
        "tag": "KL regularization"
      },
      {
        "q": "DPO's loss function is derived by:",
        "options": [
          "Reparametrizing the reward in terms of the policy itself (using the optimal RLHF solution), so preferred vs. dispreferred response log-probability ratios (relative to a reference model) become the training signal",
          "Directly applying a cross-entropy loss on generated tokens without any preference data",
          "Using a value network trained via TD-learning identical to standard actor-critic RL",
          "Minimizing the perplexity difference between two policies with no reference model"
        ],
        "answer": 0,
        "explain": "DPO substitutes the closed-form optimal-policy expression for reward into the Bradley-Terry preference model, yielding a direct classification-style loss.",
        "tag": "DPO derivation"
      }
    ],
    "short": [
      {
        "q": "Explain at a high level how DPO turns the RLHF objective into a supervised-style loss, and why this is more stable/simpler to train than PPO-based RLHF.",
        "model": "RLHF's objective is to find a policy that maximizes expected reward under a learned reward model while staying close (via KL penalty) to a reference policy; DPO shows the reward function can be analytically expressed in terms of the optimal policy's log-probabilities relative to the reference policy. Substituting this back into the Bradley-Terry preference model yields a loss computable directly from pairs of preferred/dispreferred responses using only log-probabilities under the current and reference policy, with no reward model or RL rollout needed. This is more stable and simpler than PPO because it removes the reward model training step, the high-variance sampling/rollout loop, and the associated RL hyperparameter tuning, turning preference optimization into a supervised, classification-like loss.",
        "points": [
          "reward reparametrized in terms of optimal policy log-probs vs reference",
          "resulting loss trained directly on preference pairs, no separate reward model",
          "avoids PPO's online sampling/high-variance RL loop, simpler/more stable"
        ],
        "tag": "DPO mechanics"
      }
    ]
  },
  "llm-alignment": {
    "mcq": [
      {
        "q": "What does 'alignment' mean in the context of LLMs?",
        "options": [
          "Making the model's outputs match human intentions, values, and preferences (helpful, honest, harmless), rather than just raw next-token likelihood",
          "Increasing the model's parameter count to match a target FLOP budget",
          "Aligning tokenizer vocabularies across model versions",
          "Ensuring inference latency matches a target SLA"
        ],
        "answer": 0,
        "explain": "Alignment is about steering behavior toward human intent and values, beyond simply maximizing likelihood on pretraining data.",
        "tag": "alignment definition"
      },
      {
        "q": "The 'helpful, honest, harmless' (HHH) framework is commonly used to describe:",
        "options": [
          "Three separate model architectures",
          "Three competing objectives that alignment training must balance, since being maximally helpful can conflict with being maximally harmless or honest",
          "Three stages of pretraining data curation only",
          "Three types of tokenization schemes"
        ],
        "answer": 1,
        "explain": "HHH names three often-competing goals (e.g. maximal helpfulness can push toward unsafe content) that alignment training must trade off.",
        "tag": "HHH framework"
      },
      {
        "q": "Why is alignment via RLHF/DPO alone often insufficient to guarantee safe behavior?",
        "options": [
          "Because it perfectly generalizes to every unseen adversarial prompt by construction",
          "Because it removes the model's ability to generate any harmful content at the weight level",
          "Because it optimizes on a finite, imperfect sample of human preferences/red-team data, so it can still be susceptible to jailbreaks, distribution shift, and reward-model misspecification",
          "Because it only affects the tokenizer, not model behavior"
        ],
        "answer": 2,
        "explain": "Preference data and reward models are finite and imperfect proxies, leaving gaps that adversarial prompts or novel situations can exploit.",
        "tag": "alignment limitations"
      },
      {
        "q": "Which best describes 'reward hacking' in the context of alignment?",
        "options": [
          "A human evaluator hacking into the training server",
          "The reward model achieving perfect accuracy on held-out data",
          "The base model refusing to generate any output during RL training",
          "The policy model finding ways to score highly on the (imperfect) reward/proxy signal without actually satisfying the true underlying human intent"
        ],
        "answer": 3,
        "explain": "Reward hacking occurs when the optimized policy exploits quirks of the proxy reward rather than genuinely achieving the intended goal.",
        "tag": "reward hacking"
      }
    ],
    "short": [
      {
        "q": "What is the alignment problem for LLMs, and name two distinct techniques (beyond pretraining) used to align a model's behavior with human intent.",
        "model": "The alignment problem is the challenge of ensuring an LLM's behavior reflects human intentions and values — being helpful, honest, and harmless — rather than simply optimizing next-token prediction likelihood, which can produce outputs that are fluent but unhelpful, untruthful, or unsafe. Beyond pretraining, common alignment techniques include supervised fine-tuning (SFT) on curated instruction/response demonstrations, and preference optimization methods like RLHF (reward model + PPO) or DPO that use human preference comparisons to steer the model toward preferred behaviors. Constitutional AI / rule-based reward approaches and red-teaming/safety fine-tuning are additional alignment tools.",
        "points": [
          "alignment = matching model behavior to human intent/values (HHH)",
          "SFT on demonstrations is one technique",
          "RLHF or DPO using human preference data is another technique"
        ],
        "tag": "alignment techniques"
      }
    ]
  },
  "reinforcement-finetuning": {
    "mcq": [
      {
        "q": "Reinforcement Fine-Tuning (RFT) differs from standard RLHF preference optimization primarily in that:",
        "options": [
          "RFT requires no reward signal at all",
          "RFT uses a programmatic/verifiable grader (e.g., checking correctness of a math/code answer) to produce the reward, rather than a reward model trained on subjective human preference comparisons",
          "RFT only works on image models",
          "RFT is identical to supervised fine-tuning with no RL involved"
        ],
        "answer": 1,
        "explain": "RFT's reward comes from an objective grader/checker rather than a learned model of subjective human preferences.",
        "tag": "RFT vs RLHF"
      },
      {
        "q": "RFT is best suited for tasks where:",
        "options": [
          "Correctness can be objectively verified or graded (e.g., math problems, code execution tests, structured extraction)",
          "Only subjective stylistic quality matters and there is no ground truth",
          "The task has no training examples available at all",
          "The base model already performs at ceiling accuracy"
        ],
        "answer": 0,
        "explain": "A reliable programmatic grader is required, which exists for verifiable domains like math, code, and structured extraction.",
        "tag": "RFT use cases"
      },
      {
        "q": "A key practical benefit of RFT over full RLHF pipelines is that it typically:",
        "options": [
          "Requires massive human-labeled preference datasets",
          "Cannot be combined with LoRA/PEFT methods",
          "Can achieve strong task-specific gains from a relatively small number of labeled examples plus a grading function, since the grader supplies dense/reliable reward signal",
          "Eliminates the need for a base pretrained model"
        ],
        "answer": 2,
        "explain": "Because the grader itself supplies reliable reward, RFT can be data-efficient compared to collecting large-scale human preference datasets.",
        "tag": "RFT data efficiency"
      },
      {
        "q": "What is a common risk when designing the grader/reward function for reinforcement fine-tuning?",
        "options": [
          "The grader always guarantees perfect generalization",
          "Graders cannot be used for code tasks",
          "Graders eliminate the need for any evaluation after training",
          "The grader might be gamed by the model finding shortcuts that satisfy the grader's checks without truly solving the task (reward hacking)"
        ],
        "answer": 3,
        "explain": "Imperfect graders can be exploited: the model learns to satisfy the check's letter rather than its intent.",
        "tag": "reward hacking in RFT"
      }
    ],
    "short": [
      {
        "q": "What distinguishes Reinforcement Fine-Tuning (RFT) from RLHF, and what kind of task is it best suited for?",
        "model": "RFT fine-tunes a model using reinforcement learning where the reward comes from a programmatic or rule-based grader that checks whether an output is correct (e.g., a math answer matches, code passes unit tests, extracted fields match a schema), rather than from a learned reward model trained on subjective pairwise human preferences as in RLHF. Because the grader provides an objective, verifiable, and often dense signal, RFT can produce strong task-specific improvements from a comparatively small number of examples. It is best suited for domains with checkable/verifiable correctness — math, coding, structured data extraction, and rule-based classification — rather than open-ended, subjective generation where no ground-truth grader exists.",
        "points": [
          "RFT reward comes from a verifiable/programmatic grader, not a learned preference reward model",
          "works well with relatively few labeled examples",
          "best suited for tasks with checkable correctness (math, code, structured extraction)"
        ],
        "tag": "reinforcement fine-tuning basics"
      }
    ]
  },
  "prompt-engineering": {
    "mcq": [
      {
        "q": "Few-shot prompting improves LLM performance mainly by:",
        "options": [
          "Providing in-context examples that demonstrate the desired input-output pattern/format, letting the model infer the task without any weight updates",
          "Updating the model's weights via gradient descent on the examples",
          "Increasing the model's context window size permanently",
          "Replacing the need for a system prompt entirely"
        ],
        "answer": 0,
        "explain": "Few-shot examples act as in-context demonstrations that steer the model's behavior without any parameter update.",
        "tag": "few-shot prompting"
      },
      {
        "q": "Chain-of-thought (CoT) prompting improves performance on multi-step reasoning tasks primarily because:",
        "options": [
          "It shortens the output so the model reaches the answer faster",
          "It forces the model to output only the final answer with no intermediate steps",
          "It encourages the model to generate intermediate reasoning steps, which gives the model 'more computation' via additional tokens and often surfaces errors before the final answer",
          "It reduces the number of tokens the model needs to attend to"
        ],
        "answer": 2,
        "explain": "Generating intermediate steps effectively spreads computation across more tokens, helping multi-step problems that a single-pass answer would get wrong.",
        "tag": "chain-of-thought"
      },
      {
        "q": "What is a key risk of prompt engineering as an alignment/behavior-control strategy compared to fine-tuning?",
        "options": [
          "Prompts permanently change the model weights, so mistakes are irreversible",
          "Prompt-based behavior can be brittle and overridden by adversarial user input (e.g., prompt injection) or fail to generalize consistently across paraphrased inputs",
          "Prompting cannot be used with API-based closed models",
          "Prompting always requires retraining the tokenizer"
        ],
        "answer": 1,
        "explain": "Because the behavior isn't baked into weights, it can be overridden by cleverly crafted or paraphrased inputs.",
        "tag": "prompting limitations"
      },
      {
        "q": "Which of the following is an example of 'zero-shot' prompting?",
        "options": [
          "Giving the model 5 solved examples before the actual task",
          "Fine-tuning the model on labeled task data",
          "Training a reward model on preference pairs",
          "Asking the model to perform a task directly via instructions alone, with no task-specific examples provided in the prompt"
        ],
        "answer": 3,
        "explain": "Zero-shot prompting relies purely on instructions, with no demonstration examples included in the prompt.",
        "tag": "zero-shot prompting"
      }
    ],
    "short": [
      {
        "q": "Explain why chain-of-thought prompting tends to improve accuracy on arithmetic/logical reasoning tasks, and name one limitation of relying purely on prompt engineering to elicit this behavior.",
        "model": "Chain-of-thought prompting improves accuracy by inducing the model to generate intermediate reasoning steps token-by-token before committing to a final answer; since transformers compute more effectively when they can 'think out loud' across multiple tokens rather than needing to solve everything in one shot, this extra intermediate computation reduces errors on multi-step arithmetic and logical problems and makes errors more inspectable. One limitation is that CoT elicited purely via prompting is inconsistent — the model may not always produce a genuine step-by-step trace (sometimes just a plausible-sounding rationale), and its effectiveness depends heavily on model scale and prompt phrasing, and can be brittle to distribution shifts, unlike behavior explicitly trained in.",
        "points": [
          "CoT lets the model use extra tokens as intermediate computation before the final answer",
          "reduces errors on multi-step tasks and improves interpretability",
          "prompting-only CoT is inconsistent/brittle, depends on scale and phrasing, unlike trained-in reasoning"
        ],
        "tag": "chain-of-thought mechanism"
      }
    ]
  },
  "context-engineering": {
    "mcq": [
      {
        "q": "How does 'context engineering' differ from traditional prompt engineering?",
        "options": [
          "It is identical to prompt engineering but with a different name",
          "It focuses narrowly on wording a single static prompt",
          "It focuses on the broader system of what information (retrieved docs, memory, tool outputs, history, instructions) is assembled into the model's context window at inference time, and how it's structured/prioritized",
          "It refers only to increasing the model's maximum context length"
        ],
        "answer": 2,
        "explain": "Context engineering is the broader discipline of curating and structuring everything fed into the context window, not just wording a prompt.",
        "tag": "context engineering definition"
      },
      {
        "q": "Why can simply stuffing more information into a long context window hurt performance, motivating careful context engineering?",
        "options": [
          "Longer contexts always improve accuracy with no downside",
          "Models can suffer from 'lost in the middle' effects, distraction from irrelevant content, and increased latency/cost, so relevance-filtered, well-structured context often outperforms raw maximal context",
          "Long contexts are rejected by the tokenizer",
          "Context length has no effect on model attention"
        ],
        "answer": 1,
        "explain": "Excess or poorly ordered context can dilute attention on the relevant parts and add cost, so curated context often beats maximal context.",
        "tag": "context window limits"
      },
      {
        "q": "In an agentic system with tool use, what is a core context-engineering concern?",
        "options": [
          "Deciding which tool outputs, conversation history, and retrieved facts to include/compress/summarize in the limited context budget so the model has the right information at the right time",
          "Choosing the color scheme of the UI",
          "Selecting which programming language the backend server uses",
          "Ensuring the reward model has enough preference data"
        ],
        "answer": 0,
        "explain": "Agentic pipelines must manage a limited context budget across tool outputs, history, and retrieved facts to keep the model well-informed.",
        "tag": "agentic context management"
      },
      {
        "q": "Which technique is commonly used in context engineering to manage long-running agent conversations that exceed the context window?",
        "options": [
          "Ignoring the context window limit entirely",
          "Always truncating from the most recent turn first",
          "Disabling tool use permanently",
          "Summarizing/compressing older turns or offloading them to external memory/retrieval, while keeping the most relevant/recent information in the active context"
        ],
        "answer": 3,
        "explain": "Summarization/compression and external memory offloading let long conversations fit within a bounded context window without losing key information.",
        "tag": "memory management"
      }
    ],
    "short": [
      {
        "q": "What is context engineering, and why is it often more impactful for real-world agent performance than fine-tuning or prompt wording alone?",
        "model": "Context engineering is the discipline of designing what information — instructions, retrieved documents, tool outputs, conversation history, memory — is assembled into an LLM's context window, in what order and format, and how it's filtered/compressed, rather than just crafting the wording of a single prompt. It's often more impactful for agents because most real-world failures come not from the model lacking capability but from it being fed irrelevant, poorly structured, stale, or excessive context (causing 'lost in the middle' effects or missing key facts); fixing what the model sees at inference time can be iterated quickly and cheaply compared to fine-tuning, and it directly addresses the actual information bottleneck in agentic/RAG pipelines.",
        "points": [
          "context engineering = curating/structuring all inputs (instructions, retrieval, tools, memory) fed into the context window",
          "poor context (irrelevant/excessive/stale) often causes more failures than model capability limits",
          "cheaper/faster to iterate on than fine-tuning, directly fixes information bottlenecks in agents"
        ],
        "tag": "context engineering value"
      }
    ]
  },
  "RAG": {
    "mcq": [
      {
        "q": "What problem does RAG primarily address?",
        "options": [
          "Grounding LLM responses in external, up-to-date, or proprietary knowledge that wasn't in (or is more current than) the model's pretraining data, by retrieving relevant documents at inference time",
          "Reducing the number of parameters in the model",
          "Eliminating the need for a tokenizer",
          "Replacing the transformer architecture with a retrieval-only system"
        ],
        "answer": 0,
        "explain": "RAG lets a model condition on retrieved external documents, addressing knowledge gaps and staleness in its parametric memory.",
        "tag": "RAG motivation"
      },
      {
        "q": "In a typical RAG pipeline, what happens right before the LLM generates its answer?",
        "options": [
          "The model is fine-tuned live on the retrieved documents",
          "A reward model scores the query for toxicity",
          "Relevant chunks are retrieved (e.g., via vector similarity search over embeddings) and inserted into the prompt/context alongside the user query",
          "The retrieved documents are converted into new model weights via LoRA"
        ],
        "answer": 2,
        "explain": "Retrieval fetches relevant chunks by embedding similarity, and these are inserted into the LLM's context before generation.",
        "tag": "RAG pipeline"
      },
      {
        "q": "Which is a common failure mode specific to RAG systems?",
        "options": [
          "The model refuses to tokenize the input",
          "The embedding model becomes deterministic",
          "The vector database runs out of GPU memory during inference",
          "The retriever returns irrelevant or low-quality chunks (or misses the relevant one), causing the LLM to generate an answer grounded in wrong context, or the LLM ignores/contradicts the retrieved context"
        ],
        "answer": 3,
        "explain": "Retrieval quality is a common bottleneck: irrelevant or missing chunks (or the model ignoring good context) lead to wrong answers.",
        "tag": "RAG failure modes"
      },
      {
        "q": "Compared to fine-tuning a model on a knowledge base, RAG's key advantage is:",
        "options": [
          "It permanently bakes the knowledge into the model weights, making updates cheap",
          "Knowledge can be updated simply by changing the retrieval index/corpus, without retraining the model, and sources can be cited for traceability",
          "It requires no embedding model or vector store",
          "It guarantees zero hallucination"
        ],
        "answer": 1,
        "explain": "RAG decouples knowledge updates from model weights — updating the index is far cheaper than retraining, and sources can be cited.",
        "tag": "RAG vs fine-tuning"
      }
    ],
    "short": [
      {
        "q": "Describe the two main stages of a RAG pipeline and explain one way that poor retrieval quality can cause the final answer to be wrong even if the LLM itself is capable.",
        "model": "A RAG pipeline has two main stages: (1) retrieval, where the user query (or a reformulation of it) is embedded and used to search a document index/vector store for the most relevant chunks of external knowledge, and (2) generation, where those retrieved chunks are inserted into the LLM's prompt/context alongside the query so the model can condition its answer on them. Poor retrieval quality can cause wrong answers even from a capable model because the model is fundamentally answering based on whatever context it's given — if the retriever returns irrelevant, outdated, or incomplete chunks (or misses the one chunk containing the true answer), the LLM may either hallucinate an answer to fill the gap or confidently generate a plausible-sounding but incorrect response grounded in the wrong evidence.",
        "points": [
          "retrieval stage: embed query, search vector store/index for relevant chunks",
          "generation stage: insert retrieved chunks into prompt/context for the LLM to condition on",
          "bad retrieval (irrelevant/missing chunks) causes wrong grounding even with a capable LLM"
        ],
        "tag": "RAG pipeline stages"
      }
    ]
  },
  "hallucination": {
    "mcq": [
      {
        "q": "What is an LLM 'hallucination'?",
        "options": [
          "A deliberate refusal to answer a question",
          "A model crash due to out-of-memory error",
          "A confidently stated output that is factually incorrect, unsupported, or fabricated, despite appearing fluent and plausible",
          "A prompt injection attack initiated by the user"
        ],
        "answer": 2,
        "explain": "Hallucination refers to fluent, confident output that is factually wrong or fabricated, not a system error or refusal.",
        "tag": "hallucination definition"
      },
      {
        "q": "Why do LLMs hallucinate even when trained on large amounts of factual text?",
        "options": [
          "Because next-token prediction optimizes for plausible/fluent continuations, not verified truth, so the model can generate statistically likely but unverified or fabricated content, especially in low-data or ambiguous regions",
          "Because they are explicitly trained via RL to lie",
          "Because they use a lookup table of facts that is sometimes corrupted",
          "Because tokenizers randomly drop characters"
        ],
        "answer": 0,
        "explain": "The training objective rewards fluent, likely continuations, not verified correctness, so plausible fabrications can slip through.",
        "tag": "hallucination causes"
      },
      {
        "q": "Which mitigation strategy directly reduces hallucination by grounding responses in verifiable external sources?",
        "options": [
          "Increasing the model's temperature to 2.0",
          "Removing the system prompt",
          "Reducing the model's context window",
          "Retrieval-Augmented Generation (RAG), which conditions generation on retrieved, citable documents"
        ],
        "answer": 3,
        "explain": "RAG grounds generation in retrieved, checkable documents, reducing reliance on unverified parametric memory.",
        "tag": "hallucination mitigation"
      },
      {
        "q": "What is a common way to detect hallucinations after generation (post-hoc), especially for factual claims?",
        "options": [
          "Only check the length of the output",
          "Cross-check generated claims against retrieved evidence/knowledge sources, or use a separate verifier/judge model, or check self-consistency across multiple samples",
          "Ask the same model once and always trust its first answer with no verification",
          "Increase the model's parameter count at inference time"
        ],
        "answer": 1,
        "explain": "Post-hoc detection typically verifies claims against external evidence, a separate judge model, or consistency across resamples.",
        "tag": "hallucination detection"
      }
    ],
    "short": [
      {
        "q": "Explain why fluent, confident-sounding text from an LLM is not sufficient evidence of factual correctness, and describe one technique to reduce hallucination in a production system.",
        "model": "LLMs are trained to predict the statistically most likely next token given context, which optimizes for fluency and plausibility, not for verified truth; the model has no built-in mechanism distinguishing a memorized fact from a plausible-sounding fabrication, so it can generate confident, well-formed sentences that are entirely incorrect, especially for rare facts, ambiguous queries, or claims outside its training distribution. One effective mitigation is Retrieval-Augmented Generation, which grounds the model's answer in retrieved, citable source documents at inference time, reducing reliance on parametric memory and allowing the answer to be checked against or restricted to the retrieved evidence.",
        "points": [
          "fluency/confidence is a byproduct of next-token prediction, not a correctness signal",
          "models can't reliably distinguish memorized fact from plausible fabrication",
          "RAG (or self-consistency/verifier checks) is a mitigation technique"
        ],
        "tag": "hallucination fundamentals"
      }
    ]
  },
  "reasoning-in-LLMs": {
    "mcq": [
      {
        "q": "What distinguishes 'System 2'-style reasoning approaches (e.g., chain-of-thought, tree-of-thought, deliberate multi-step reasoning) from a standard single-pass LLM generation?",
        "options": [
          "They allocate additional inference-time computation to explore, verify, or backtrack over intermediate reasoning steps before producing a final answer, rather than committing to an answer in one forward pass",
          "They use a completely different neural architecture with no transformer layers",
          "They require no training data whatsoever",
          "They eliminate the need for a tokenizer"
        ],
        "answer": 0,
        "explain": "System 2-style methods spend extra inference-time compute exploring/verifying intermediate steps rather than answering in one shot.",
        "tag": "System 2 reasoning"
      },
      {
        "q": "Tree-of-thought reasoning extends chain-of-thought by:",
        "options": [
          "Restricting the model to a single linear reasoning path with no branching",
          "Requiring a separate reward model trained via PPO",
          "Exploring multiple candidate reasoning paths/branches at each step, evaluating and pruning them (e.g., via search), rather than committing to one linear chain",
          "Removing all intermediate steps and outputting only the final answer"
        ],
        "answer": 2,
        "explain": "Tree-of-thought treats reasoning as a search over branching candidate paths, with evaluation and pruning, instead of one fixed chain.",
        "tag": "tree-of-thought"
      },
      {
        "q": "Why might self-consistency (sampling multiple chain-of-thought reasoning paths and taking a majority vote over final answers) improve accuracy over a single greedy CoT generation?",
        "options": [
          "It guarantees the model reasons correctly every single time",
          "It reduces the number of tokens generated per sample",
          "It requires fine-tuning a new reward model for each query",
          "Different sampled reasoning paths may make different errors; aggregating across many independent samples reduces the influence of any single path's mistake, converging toward the more consistently-reached (often correct) answer"
        ],
        "answer": 3,
        "explain": "Majority voting over independently sampled reasoning paths averages out idiosyncratic errors made along any single path.",
        "tag": "self-consistency"
      },
      {
        "q": "A key limitation of chain-of-thought reasoning traces produced by LLMs is that:",
        "options": [
          "They are always a faithful, causally accurate representation of the actual computation the model used to reach its answer",
          "The stated reasoning steps may not faithfully reflect the model's true internal computation — the model can produce a plausible-looking rationale that doesn't causally explain the final answer",
          "They cannot be used to improve accuracy on any task",
          "They require no additional inference-time compute compared to direct answering"
        ],
        "answer": 1,
        "explain": "Research shows CoT traces can be post-hoc rationalizations rather than a faithful account of the model's actual computation.",
        "tag": "CoT faithfulness"
      }
    ],
    "short": [
      {
        "q": "Explain the difference between chain-of-thought prompting and more advanced search-based reasoning methods like tree-of-thought, and why the latter can outperform simple CoT on harder problems.",
        "model": "Chain-of-thought prompting has the model generate a single linear sequence of intermediate reasoning steps before its final answer, committing to one path with no ability to reconsider earlier decisions. Tree-of-thought (and related search-based methods like beam search over reasoning steps or Monte Carlo tree search) instead treats reasoning as a search problem: the model generates multiple candidate next-steps or branches at each point, evaluates/scores them, and can backtrack or prune less-promising paths, exploring several possible reasoning trajectories rather than being locked into the first one generated. This outperforms simple CoT on harder problems because it mitigates the risk of an early wrong step derailing the entire chain — the model can recover by exploring alternative branches and selecting the most promising path, at the cost of higher inference compute.",
        "points": [
          "CoT = single linear reasoning path, no backtracking",
          "tree-of-thought = branching search over multiple candidate reasoning paths with evaluation/pruning",
          "search-based methods recover from early mistakes and explore alternatives, at higher inference cost"
        ],
        "tag": "search-based reasoning"
      }
    ]
  },
  "factuality-in-LLMs": {
    "mcq": [
      {
        "q": "In the context of LLM factuality evaluation, what is an 'atomic fact' (as used in decomposition-based factuality metrics like FActScore)?",
        "options": [
          "The entire generated response treated as a single unit",
          "A minimal, independently verifiable claim extracted from a longer generation, each checked individually against a knowledge source",
          "A token embedding vector",
          "A hyperparameter of the reward model"
        ],
        "answer": 1,
        "explain": "Atomic facts are the smallest independently checkable claims a passage is decomposed into, each verified separately.",
        "tag": "atomic fact decomposition"
      },
      {
        "q": "What does 'calibration' mean when evaluating factuality/confidence in LLMs?",
        "options": [
          "Whether the model's stated or implicit confidence in a claim matches the actual probability that the claim is correct",
          "Whether the model's output is grammatically correct",
          "Whether the tokenizer vocabulary size matches the training corpus size",
          "Whether the model was fine-tuned using PPO"
        ],
        "answer": 0,
        "explain": "Calibration measures whether expressed/implicit confidence tracks true correctness probability, not fluency or training method.",
        "tag": "model calibration"
      },
      {
        "q": "Why is factual accuracy on long-form generation harder to evaluate than on short-form QA?",
        "options": [
          "Long-form outputs never contain factual claims",
          "Short-form QA cannot be automatically graded at all",
          "Long-form outputs contain many individual claims that each need separate verification, and errors can be partial (some claims true, some false) rather than a single right/wrong judgment",
          "Long-form generation always uses a different model architecture"
        ],
        "answer": 2,
        "explain": "A long passage bundles many claims together, so evaluation must check each individually rather than assign one right/wrong label.",
        "tag": "long-form factuality evaluation"
      },
      {
        "q": "Which factor is a known contributor to factual errors in LLMs, distinct from pure hallucination via fabrication?",
        "options": [
          "The model refusing to answer any factual question",
          "The model always citing sources correctly",
          "The reward model producing a zero learning rate",
          "Outdated parametric knowledge — the model's training data has a knowledge cutoff, so it can confidently state facts that were true at training time but have since changed"
        ],
        "answer": 3,
        "explain": "Even without fabricating, a model can state once-true facts that are now stale because its knowledge is frozen at a training cutoff.",
        "tag": "knowledge cutoff / staleness"
      }
    ],
    "short": [
      {
        "q": "Explain why measuring factuality in long-form LLM generations is more complex than simple accuracy on a QA benchmark, and describe one approach used to evaluate it.",
        "model": "Long-form generations typically contain many distinct factual claims woven together, so a single right/wrong label doesn't capture quality — a response can be mostly accurate with one embedded fabrication, or vice versa, and claims can vary in verifiability and importance. One common evaluation approach (e.g., FActScore-style methods) decomposes the generation into atomic facts — minimal, independently checkable claims — and then verifies each one against a trusted knowledge source (a knowledge base, retrieved documents, or human judgment), aggregating the fraction of supported atomic facts into a factuality score, rather than judging the whole passage as a single unit.",
        "points": [
          "long-form text contains many independently-verifiable claims, not a single right/wrong answer",
          "errors can be partial (some claims true, some false)",
          "decomposition into atomic facts + per-claim verification (e.g. FActScore) is a common evaluation method"
        ],
        "tag": "long-form factuality measurement"
      }
    ]
  },
  "LLM-as-a-judge": {
    "mcq": [
      {
        "q": "What is the core idea of using 'LLM-as-a-judge'?",
        "options": [
          "Using a strong LLM to evaluate/score/compare the outputs of other model(s), often as a scalable proxy for human evaluation",
          "Using an LLM exclusively to generate training data with no evaluation role",
          "Replacing the reward model in RLHF with a rule-based grader only",
          "Using a smaller model exclusively to speed up tokenization"
        ],
        "answer": 0,
        "explain": "An LLM judge scores or compares candidate outputs, standing in for costly, slow human evaluation at scale.",
        "tag": "LLM-as-judge concept"
      },
      {
        "q": "A well-documented bias of LLM judges is 'position bias,' which refers to:",
        "options": [
          "The judge only evaluating responses generated at a specific temperature",
          "The judge preferring shorter responses in all cases",
          "The judge favoring whichever response is presented first (or in a particular slot) in a pairwise comparison, regardless of actual quality",
          "The judge refusing to score any response above length 100 tokens"
        ],
        "answer": 2,
        "explain": "Position bias is a systematic preference for a response's presentation slot rather than its actual quality.",
        "tag": "position bias"
      },
      {
        "q": "Which technique is commonly used to reduce self-preference or position bias when using LLM-as-a-judge for pairwise comparisons?",
        "options": [
          "Always using the same model as both the judge and one of the candidates being judged",
          "Randomizing/swapping the order of the two candidate responses across repeated judgments and aggregating results",
          "Reducing the judge's context window to force shorter evaluations",
          "Disabling the judge's ability to see the original prompt"
        ],
        "answer": 1,
        "explain": "Swapping presentation order and aggregating results cancels out a systematic bias toward a particular slot.",
        "tag": "bias mitigation"
      },
      {
        "q": "Why is LLM-as-a-judge attractive as an evaluation method despite its known biases?",
        "options": [
          "It is provably free of any bias or error",
          "It eliminates the need for any evaluation benchmark",
          "It requires no prompt design at all",
          "It scales far more cheaply and quickly than human evaluation while often correlating reasonably well with human judgments on many tasks, making it useful for rapid iteration"
        ],
        "answer": 3,
        "explain": "Despite biases, LLM judges are far cheaper/faster than humans and often correlate well enough with human ratings for rapid iteration.",
        "tag": "LLM judge scalability"
      }
    ],
    "short": [
      {
        "q": "Describe two known biases/failure modes of using an LLM as a judge, and one mitigation for each.",
        "model": "One known bias is position bias, where the judge systematically favors whichever response appears in a particular position (e.g., first) in a pairwise comparison regardless of true quality; this is commonly mitigated by presenting both orderings of a pair to the judge and aggregating or averaging the results. Another is self-preference/verbosity bias, where a judge model tends to rate responses generated by itself (or longer/more verbose responses) more favorably even when they aren't actually better; this can be mitigated by using a different, independent judge model than the one being evaluated, calibrating against human-labeled reference judgments, and/or explicitly instructing the judge to discount length/style in favor of substantive content.",
        "points": [
          "position bias: favoring a slot/order in pairwise comparisons; mitigated by order-swapping/randomization",
          "self-preference or verbosity bias: favoring own-style or longer outputs; mitigated by using an independent judge model and/or human calibration",
          "both stem from the judge's own priors influencing scores, not just true response quality"
        ],
        "tag": "LLM judge biases"
      }
    ]
  },
  "agents": {
    "mcq": [
      {
        "q": "What distinguishes an 'agent' from a simple one-shot LLM call in an application?",
        "options": [
          "Agents use a larger context window",
          "Agents autonomously decide actions/tool calls in a loop based on observations, using an LLM as the reasoning engine",
          "Agents always require reinforcement learning fine-tuning",
          "Agents only work with vision models"
        ],
        "answer": 1,
        "explain": "The defining feature of an agent is a perceive-reason-act loop where the LLM decides and takes actions based on evolving observations, not a single static response.",
        "tag": "agent definition"
      },
      {
        "q": "In the typical agent loop (perceive-reason-act), what role does the 'observation' step play?",
        "options": [
          "It updates the model's weights",
          "It selects the next LLM checkpoint to load",
          "It feeds the result of a tool call or environment back into context for the next reasoning step",
          "It terminates the agent immediately"
        ],
        "answer": 2,
        "explain": "Observations are the feedback from actions (e.g., tool outputs) that get appended to context so the agent can reason about what to do next.",
        "tag": "agent loop"
      },
      {
        "q": "What is a common failure mode for agents on long-running, multi-step tasks?",
        "options": [
          "Underflow of floating point values in embeddings",
          "Context window exhaustion or drift as history accumulates, causing loss of coherence",
          "Excess GPU memory bandwidth",
          "Vanishing gradients during inference"
        ],
        "answer": 1,
        "explain": "As trajectories grow, accumulated history can exceed context limits or dilute attention, degrading the agent's coherence and decision quality.",
        "tag": "long-horizon failure modes"
      },
      {
        "q": "Why do agents typically need a memory component separate from the LLM's context window?",
        "options": [
          "To persist information across sessions/steps beyond what fits in the limited context window",
          "To increase the model's parameter count",
          "To bypass tokenizer vocabulary limits",
          "To perform gradient descent during inference"
        ],
        "answer": 0,
        "explain": "External memory (e.g., a vector store or file) lets an agent retain and retrieve relevant information beyond the fixed size of the context window.",
        "tag": "agent memory"
      }
    ],
    "short": [
      {
        "q": "Explain the core components of an LLM-based agent architecture and why tool use matters.",
        "model": "An agent combines an LLM reasoning core with planning, memory, and tool-use components arranged in a loop: the model reasons about the current state, selects an action (often a tool call), observes the result, and updates its plan. Tool use lets the agent extend beyond the LLM's static knowledge and text-only output, letting it query APIs, execute code, or retrieve documents to ground its actions in real, up-to-date information. This loop continues until a stopping condition (goal achieved, budget exhausted) is met.",
        "points": [
          "reason-act-observe loop",
          "tool use grounds actions in external state",
          "memory persists context beyond window",
          "stopping/termination conditions"
        ],
        "tag": "agent architecture"
      }
    ]
  },
  "agentic-design-patterns": {
    "mcq": [
      {
        "q": "What is the core idea of the ReAct pattern?",
        "options": [
          "Interleaving reasoning traces ('thoughts') with actions and observations to ground decisions",
          "Running two agents adversarially to reach consensus",
          "Precomputing all actions before execution with no feedback",
          "Randomly sampling actions to explore reward"
        ],
        "answer": 0,
        "explain": "ReAct explicitly alternates reasoning steps with actions and their observed results, letting each decision be grounded in fresh evidence.",
        "tag": "ReAct"
      },
      {
        "q": "In the Reflection (self-critique) pattern, what does the agent do?",
        "options": [
          "It fine-tunes its own weights after each task",
          "It reviews its own prior output/attempt and critiques it to produce an improved iteration",
          "It samples from multiple independent models and votes",
          "It refuses to answer until a human unblocks it"
        ],
        "answer": 1,
        "explain": "Reflection has the agent (or a critic) evaluate a completed attempt and generate feedback used to revise the next iteration, without any weight updates.",
        "tag": "Reflection pattern"
      },
      {
        "q": "What problem does the Planning pattern (decomposing a task into sub-tasks before execution) primarily address?",
        "options": [
          "It reduces GPU memory usage during inference",
          "It helps handle complex, multi-step goals by breaking them into manageable, ordered steps instead of solving everything in one generation",
          "It eliminates the need for any tool calls",
          "It guarantees no hallucination will occur"
        ],
        "answer": 1,
        "explain": "Planning decomposes a large goal into a sequence of smaller, trackable sub-tasks, which is especially useful for tasks too complex to solve in a single pass.",
        "tag": "planning pattern"
      },
      {
        "q": "In a multi-agent orchestrator-worker pattern, what is the main benefit compared to a single monolithic agent?",
        "options": [
          "It reduces total token usage to exactly zero",
          "Specialized sub-agents can focus on narrower tasks/roles, improving reliability and enabling parallelism, while an orchestrator coordinates them",
          "It removes the need for any prompts",
          "It guarantees fully deterministic output"
        ],
        "answer": 1,
        "explain": "Splitting work across specialized sub-agents lets each focus on a narrower responsibility and can run in parallel, improving reliability over one agent trying to do everything.",
        "tag": "multi-agent orchestration"
      }
    ],
    "short": [
      {
        "q": "Compare ReAct and Reflection patterns and when you'd combine them.",
        "model": "ReAct interleaves explicit reasoning ('thought') with tool-calling actions and their observations, letting the agent ground each decision in fresh evidence step by step. Reflection instead has the agent (or a separate critic) look back at a completed attempt or intermediate output and critique it, generating feedback used to revise the next attempt. They're complementary: ReAct drives the step-by-step execution loop, while Reflection adds an outer loop that catches errors ReAct alone missed, improving output quality on complex or error-prone tasks at the cost of extra latency/tokens.",
        "points": [
          "ReAct = thought+action+observation loop",
          "Reflection = self-critique after an attempt",
          "complementary: inner execution vs outer quality loop",
          "trade-off: extra latency/cost for reliability"
        ],
        "tag": "pattern composition"
      }
    ]
  },
  "agentic-RL": {
    "mcq": [
      {
        "q": "What is the key challenge of applying RL to LLM-based agents performing multi-step tasks, compared to single-turn RLHF?",
        "options": [
          "Multi-step trajectories require credit assignment across many actions/tool calls, with rewards often sparse and only available at the end of long episodes",
          "There is no meaningful challenge — it is identical to single-turn RLHF",
          "Multi-step tasks fundamentally require no reward signal at all",
          "Agentic RL cannot use policy gradient methods"
        ],
        "answer": 0,
        "explain": "Long trajectories with delayed, sparse rewards make it hard to determine which of many earlier actions actually contributed to eventual success or failure.",
        "tag": "credit assignment"
      },
      {
        "q": "In agentic RL, what does 'reward hacking' refer to?",
        "options": [
          "The agent exploiting the literal wording of a reward function to gain reward without actually accomplishing the intended task",
          "The agent stealing reward signal from other agents in a shared environment",
          "A technique used to speed up policy convergence",
          "A bug specific to the tokenizer"
        ],
        "answer": 0,
        "explain": "Reward hacking occurs when a policy finds a way to maximize the specified reward metric that diverges from the true underlying task goal.",
        "tag": "reward hacking"
      },
      {
        "q": "Why are outcome-based rewards (only rewarding final task success) often combined with process/step-level rewards in agentic RL?",
        "options": [
          "Outcome-only rewards are prohibited under RLHF frameworks",
          "Sparse outcome rewards make credit assignment hard over long trajectories, so intermediate/process rewards help guide learning at each step",
          "Process rewards eliminate the need for any environment interaction",
          "Outcome rewards always cause the policy to overfit instantly"
        ],
        "answer": 1,
        "explain": "Process/step rewards provide denser, more immediate feedback, mitigating the difficulty of learning from a single sparse terminal signal.",
        "tag": "reward shaping"
      },
      {
        "q": "What is a common technique to reduce the cost/instability of training agentic RL policies that interact with real tools/environments?",
        "options": [
          "Using simulated or cached environments/replay buffers and off-policy or batched rollouts to amortize expensive interaction costs",
          "Removing the reward model entirely",
          "Restricting training to single-timestep episodes only",
          "Disabling the environment during training"
        ],
        "answer": 0,
        "explain": "Simulated environments, cached interactions, and off-policy learning let training reuse or approximate costly real interactions rather than requiring fresh live rollouts every update.",
        "tag": "training efficiency"
      }
    ],
    "short": [
      {
        "q": "Explain why credit assignment is harder in agentic RL than in standard single-turn RLHF, and give one mitigation.",
        "model": "In single-turn RLHF, a reward is assigned directly to one generated response, making credit assignment trivial. In agentic RL, an episode consists of many interleaved actions, tool calls, and observations, and reward is often only available at the very end (task success/failure), so it's unclear which of the many earlier decisions contributed to the outcome. Mitigations include process/step-level reward models, reward shaping, or decomposing trajectories with intermediate verifiable checkpoints to provide denser learning signal.",
        "points": [
          "sparse terminal reward over long trajectories",
          "hard to attribute success to specific steps",
          "mitigation: process rewards / reward shaping",
          "mitigation: intermediate verifiable checkpoints"
        ],
        "tag": "credit assignment"
      }
    ]
  },
  "agent-skills": {
    "mcq": [
      {
        "q": "What is the primary purpose of 'Agent Skills' as a design construct?",
        "options": [
          "To permanently fine-tune the underlying model for a narrow domain",
          "To package reusable, self-contained instructions/procedures/tools for a specific task that an agent can discover and load on demand rather than keeping all instructions in the base context at all times",
          "To replace the need for tool calling entirely",
          "To store the agent's long-term conversational memory"
        ],
        "answer": 1,
        "explain": "Skills are modular packages of instructions that are loaded only when relevant, rather than being baked permanently into every prompt.",
        "tag": "skill purpose"
      },
      {
        "q": "Why do skills typically use progressive disclosure (a short name/description shown first, full content loaded only when invoked)?",
        "options": [
          "It keeps the base context window small by only pulling in the full skill's instructions when relevant, avoiding wasted tokens on unused skills",
          "It is required for legal compliance reasons",
          "It prevents the model from ever using more than one skill in a session",
          "It disables tool use inside the skill"
        ],
        "answer": 0,
        "explain": "Progressive disclosure avoids permanently consuming context budget on skills that aren't relevant to the current request.",
        "tag": "progressive disclosure"
      },
      {
        "q": "How do Agent Skills typically differ from a single long system prompt covering the same capabilities?",
        "options": [
          "They are functionally identical with no meaningful trade-offs",
          "Skills are modular and independently loadable/maintainable/composable, so relevant capability is added only when needed, whereas a single long prompt is always present and harder to maintain as it grows",
          "Skills cannot include usage examples",
          "Skills only work with vision-capable models"
        ],
        "answer": 1,
        "explain": "Modularity lets each skill be maintained, versioned, and loaded independently, avoiding the context bloat and maintenance burden of one giant always-on prompt.",
        "tag": "modularity vs monolithic prompt"
      },
      {
        "q": "What is a key risk when an agent has access to many skills that could plausibly match a given user request?",
        "options": [
          "Ambiguous or overlapping skill descriptions can cause the wrong skill to be selected, so descriptions must be specific and disambiguating",
          "Skills always execute in parallel, causing race conditions",
          "Skills cannot be updated without retraining the base model",
          "There is no risk; skill selection is always deterministic and perfect"
        ],
        "answer": 0,
        "explain": "If descriptions overlap or are vague, the agent may pick an irrelevant or wrong skill, so clear, specific, disambiguating descriptions are essential.",
        "tag": "skill selection risk"
      }
    ],
    "short": [
      {
        "q": "Explain the trade-off Agent Skills make between context efficiency and capability, and how progressive disclosure resolves it.",
        "model": "Keeping every possible instruction set in the base system prompt would bloat the context window and dilute the model's attention with mostly-irrelevant content. Agent Skills solve this by only surfacing a short name and description by default, and loading the full instructions, scripts, or reference files only when the model determines a skill is relevant to the current task. This progressive disclosure keeps the always-on context small while still giving the agent access to a large library of specialized capabilities on demand.",
        "points": [
          "avoids bloating base context with unused instructions",
          "short description first, full content loaded on invocation",
          "enables large skill libraries without context cost",
          "relies on accurate/disambiguating descriptions for correct selection"
        ],
        "tag": "progressive disclosure trade-off"
      }
    ]
  },
  "recsys-intro": {
    "mcq": [
      {
        "q": "Why do large-scale recommender systems use a two-stage (candidate generation → ranking) architecture?",
        "options": [
          "To reduce model bias",
          "Cheap recall can shrink millions of items to hundreds; expensive precise scoring then runs only on that small set",
          "Because ranking models cannot handle embeddings",
          "To avoid cold-start entirely"
        ],
        "answer": 1,
        "tag": "two-stage design",
        "explain": "Candidate generation trades precision for speed at huge scale; ranking spends its compute budget on a few hundred survivors."
      },
      {
        "q": "Collaborative filtering primarily relies on…",
        "options": [
          "Item content/metadata features",
          "Patterns in user–item interactions across many users",
          "Hand-written business rules",
          "The item's text description only"
        ],
        "answer": 1,
        "tag": "collaborative filtering",
        "explain": "CF learns from interaction patterns ('users like you also liked…'), independent of item content."
      },
      {
        "q": "The cold-start problem refers to…",
        "options": [
          "Slow model training",
          "Poor recommendations for new users or new items with little interaction history",
          "High serving latency at startup",
          "Overfitting to popular items"
        ],
        "answer": 1,
        "tag": "cold start",
        "explain": "New users/items lack interaction signal, so CF struggles; content features or exploration help bridge it."
      },
      {
        "q": "Implicit feedback (vs explicit) is characterized by…",
        "options": [
          "Star ratings the user typed",
          "Signals like clicks/dwell/purchases that imply preference but have no negatives labeled",
          "Only thumbs-up/down",
          "Survey responses"
        ],
        "answer": 1,
        "tag": "implicit feedback",
        "explain": "Implicit feedback is abundant but one-class: a non-click isn't necessarily a negative, complicating training."
      }
    ],
    "short": [
      {
        "q": "Describe the core trade-off between the candidate-generation and ranking stages.",
        "model": "Candidate generation optimizes recall at massive scale with cheap models (e.g. two-tower ANN retrieval) — it must not miss good items but can be imprecise. Ranking optimizes precision/ordering with a richer, costlier model over a few hundred candidates, using many features and cross-features it couldn't afford at retrieval scale.",
        "points": [
          "candidate gen = high recall, cheap, huge scale",
          "ranking = high precision, rich features, small candidate set",
          "budget shifts from breadth to depth between stages"
        ],
        "tag": "candidate-gen vs ranking"
      }
    ]
  },
  "recsys-candidate-gen": {
    "mcq": [
      {
        "q": "In a typical recommender system pipeline, what is the primary goal of the candidate generation stage?",
        "options": [
          "Maximize precision on the final displayed list",
          "Compute exact pairwise scores for every user-item pair in the catalog",
          "Efficiently narrow millions of items down to a smaller relevant subset with high recall, cheaply",
          "Calibrate predicted probabilities to match true click rates"
        ],
        "answer": 2,
        "explain": "Candidate generation must cheaply retrieve a high-recall subset from a huge catalog; precision and exact scoring are left to later ranking stages.",
        "tag": "recall vs precision"
      },
      {
        "q": "Why do two-tower retrieval models compute user and item embeddings in separate towers rather than a single cross-network?",
        "options": [
          "Item embeddings can be precomputed offline and indexed (e.g., via ANN) for fast nearest-neighbor retrieval at serving time",
          "It improves accuracy by allowing feature crosses between user and item features",
          "It removes the need for negative sampling during training",
          "It allows the model to directly optimize NDCG without a ranking stage"
        ],
        "answer": 0,
        "explain": "Separating user and item towers means item embeddings don't depend on the query, so they can be precomputed and searched via ANN — the whole point of two-tower retrieval.",
        "tag": "two-tower retrieval"
      },
      {
        "q": "When training a two-tower retrieval model with in-batch negative sampling, what is a well-known pitfall?",
        "options": [
          "It requires manually labeled negative examples that are expensive to collect",
          "In-batch negatives always improve model calibration automatically",
          "It only works when training with tree-based models, not neural networks",
          "Popular items appear disproportionately often as negatives, biasing the model against popular items unless corrected (e.g., logQ correction)"
        ],
        "answer": 3,
        "explain": "In-batch negative sampling draws negatives from other examples in the batch, which oversamples popular items as negatives, requiring frequency-based correction like logQ.",
        "tag": "in-batch negative sampling"
      },
      {
        "q": "Production recommenders often combine several candidate generators (e.g., embedding-based, collaborative filtering, popularity-based, graph-based) before ranking. What is the main reason?",
        "options": [
          "To reduce serving latency by using fewer ANN lookups overall",
          "Each generator captures different notions of relevance/diversity, and no single retrieval method achieves perfect recall on all relevant items",
          "To avoid needing a ranking stage entirely",
          "Because an ANN index can only store embeddings from one source at a time"
        ],
        "answer": 1,
        "explain": "Different candidate sources (embeddings, CF, popularity, graph) surface different relevant items; combining them improves overall recall before ranking.",
        "tag": "multi-source retrieval"
      }
    ],
    "short": [
      {
        "q": "Explain the trade-off between recall and computational cost in candidate generation, and how ANN search addresses it.",
        "model": "Candidate generation must search over millions or billions of items under tight latency budgets, so exact nearest-neighbor search is infeasible. Approximate nearest neighbor methods (HNSW, IVF, product quantization) trade a small, controllable amount of recall for large speedups by indexing approximate structures instead of doing a linear scan. The key tension is that you want high recall so you don't miss relevant items downstream, but exact search costs grow linearly with catalog size, so ANN gives sub-linear-feeling search at a tunable accuracy cost.",
        "points": [
          "recall vs latency/cost tradeoff at scale",
          "ANN trades small recall loss for large speed gains via approximate structures",
          "tunable knobs (e.g., ef_search, nprobe) let you dial accuracy vs speed",
          "candidate-gen recall sets a ceiling that downstream ranking cannot recover from"
        ],
        "tag": "ANN recall-latency tradeoff"
      }
    ]
  },
  "recsys-ranking": {
    "mcq": [
      {
        "q": "In learning-to-rank, which formulation optimizes the relative order of item PAIRS?",
        "options": [
          "Pointwise",
          "Pairwise",
          "Listwise",
          "Unsupervised"
        ],
        "answer": 1,
        "tag": "LTR formulations",
        "explain": "Pairwise LTR (e.g. RankNet) learns from ordered pairs; pointwise predicts absolute scores, listwise optimizes whole-list metrics."
      },
      {
        "q": "NDCG rewards a ranking that…",
        "options": [
          "Places any relevant item anywhere in the list",
          "Places highly-relevant items near the top, with a logarithmic position discount",
          "Maximizes total clicks regardless of order",
          "Has uniform relevance across positions"
        ],
        "answer": 1,
        "tag": "NDCG",
        "explain": "DCG sums graded relevance discounted by log2(position); NDCG normalizes by the ideal ordering."
      },
      {
        "q": "Why are gradient-boosted decision trees (LambdaMART / LightGBM) so common for ranking?",
        "options": [
          "They require no features",
          "They handle heterogeneous tabular features well and LambdaRank gradients directly target ranking metrics like NDCG",
          "They are the only models that output probabilities",
          "They cannot overfit"
        ],
        "answer": 1,
        "tag": "GBDT for ranking",
        "explain": "GBDTs excel on tabular features; LambdaMART weights pairwise gradients by the ΔNDCG from swapping the pair, aligning training with the metric."
      },
      {
        "q": "Position bias in click-logged ranking data means…",
        "options": [
          "Items are biased toward one category",
          "Higher-ranked items get more clicks simply because they are shown higher, not only because they are more relevant",
          "The model is biased toward negatives",
          "Clicks are random noise"
        ],
        "answer": 1,
        "tag": "position bias",
        "explain": "Exposure depends on rank, so raw clicks conflate relevance with position; correcting it (e.g. IPW) is key to unbiased LTR."
      }
    ],
    "short": [
      {
        "q": "How does LambdaMART fold the ranking metric (e.g. NDCG) into training, given that NDCG is non-differentiable?",
        "model": "Instead of differentiating NDCG directly, LambdaMART defines 'lambdas' — the pairwise RankNet gradients — and scales each pair's lambda by |ΔNDCG|, the change in NDCG that would result from swapping that pair's positions. Pairs whose swap moves the metric most get the largest gradient, so the trees are nudged to fix the swaps that matter for the metric, without ever differentiating NDCG.",
        "points": [
          "NDCG is non-differentiable → don't differentiate it",
          "use pairwise (RankNet) gradients = 'lambdas'",
          "scale each lambda by |ΔNDCG| of swapping the pair",
          "metric-important swaps dominate the gradient"
        ],
        "tag": "LambdaMART lambdas"
      }
    ]
  },
  "recsys-re-ranking": {
    "mcq": [
      {
        "q": "What problem does Maximal Marginal Relevance (MMR) re-ranking address?",
        "options": [
          "Calibrating predicted CTR to true CTR",
          "Reducing redundancy by balancing relevance against diversity relative to already-selected items",
          "Correcting for position bias present in training labels",
          "Speeding up approximate nearest neighbor retrieval"
        ],
        "answer": 1,
        "explain": "MMR explicitly trades off an item's relevance against its similarity to items already chosen, reducing redundant/near-duplicate results.",
        "tag": "MMR diversity"
      },
      {
        "q": "Which of the following is a typical goal of the re-ranking stage that is NOT usually optimized directly by the initial ranking model?",
        "options": [
          "Predicted click-through rate",
          "Raw relevance score from the retrieval model",
          "ANN index construction parameters",
          "Diversity, freshness, and business constraints (e.g., category caps, fairness)"
        ],
        "answer": 3,
        "explain": "The base ranking model typically optimizes a single relevance/value signal; re-ranking layers in diversity, freshness, and business rules on top.",
        "tag": "business constraints"
      },
      {
        "q": "Why is re-ranking typically done listwise (considering the whole candidate list jointly) rather than by simply sorting individual pointwise scores?",
        "options": [
          "Individual item scores don't capture interaction effects like redundancy, complementarity, and position-dependent utility across the list",
          "Listwise methods are always computationally faster than pointwise sorting",
          "Pointwise scoring cannot be computed for lists longer than 100 items",
          "Listwise re-ranking removes the need for a candidate generation stage"
        ],
        "answer": 0,
        "explain": "A list's quality depends on how items relate to each other (redundancy, complementary coverage), which pointwise per-item scores alone ignore.",
        "tag": "listwise re-ranking"
      },
      {
        "q": "A re-ranking stage that occasionally swaps in a lower-scored item to gather feedback data is implementing which concept?",
        "options": [
          "Calibration",
          "Feature crossing",
          "Explore/exploit trade-off (exploration)",
          "Position bias correction"
        ],
        "answer": 2,
        "explain": "Deliberately serving a lower-scored item to gather feedback trades off some certain reward for information gain — this is exploration in the explore/exploit sense.",
        "tag": "explore/exploit"
      }
    ],
    "short": [
      {
        "q": "Describe how MMR balances relevance and diversity, including the role of the trade-off parameter lambda.",
        "model": "MMR iteratively selects the next item to add by maximizing λ·relevance(item) − (1−λ)·max_similarity(item, already_selected). A λ near 1 favors pure relevance and reproduces the original ranking order, while a λ near 0 favors diversity by heavily penalizing items similar to ones already chosen. It's typically applied as a post-processing step after a ranking model has produced relevance scores, using some item similarity metric such as embedding cosine similarity or category overlap.",
        "points": [
          "formula combines relevance term and a diversity penalty against selected items",
          "lambda is the tunable knob between pure relevance and pure diversity",
          "applied after the base ranking model, not instead of it",
          "reduces redundancy/near-duplicate items in the final list"
        ],
        "tag": "MMR lambda tradeoff"
      }
    ]
  },
  "recsys-calibration": {
    "mcq": [
      {
        "q": "A model is \"well-calibrated\" if...",
        "options": [
          "It has the highest possible AUC among all candidate models",
          "It ranks all positive examples strictly above all negative examples",
          "Its loss function is cross-entropy rather than squared error",
          "Among items predicted with probability p of a click, approximately p fraction actually receive clicks"
        ],
        "answer": 3,
        "explain": "Calibration is about predicted probabilities matching empirical outcome frequencies, not about ranking quality.",
        "tag": "calibration definition"
      },
      {
        "q": "Why is calibration especially critical in systems that multiply predicted CTR by a bid/value to rank or price items (e.g., eCPM-style ranking)?",
        "options": [
          "Miscalibrated probabilities directly distort the expected-value computation (e.g., CTR×bid), causing systematically over- or under-valued items regardless of ranking order",
          "Calibration only affects training speed, not serving decisions",
          "Calibration is only relevant for binary classification, never for ranking",
          "AUC cannot be computed unless the model is calibrated"
        ],
        "answer": 0,
        "explain": "When probability estimates feed directly into a value formula like CTR×bid, a systematic bias in the probability multiplies straight through into a systematic bias in valuation.",
        "tag": "eCPM distortion"
      },
      {
        "q": "Which statement about calibration and ranking quality (e.g., AUC) is correct?",
        "options": [
          "High AUC guarantees good calibration automatically",
          "A model can have excellent ranking ability (high AUC) while still being poorly calibrated, since AUC depends only on relative order, not on the actual probability values",
          "Calibration is mathematically a strict subset of AUC",
          "Improving calibration always improves AUC as a side effect"
        ],
        "answer": 1,
        "explain": "AUC is invariant to any monotonic transformation of scores, so it says nothing about whether the absolute probability values are accurate — that's calibration's job.",
        "tag": "AUC vs calibration"
      },
      {
        "q": "Isotonic regression is often preferred over Platt scaling for calibrating recommender scores when...",
        "options": [
          "The dataset is very small, since isotonic regression needs less data than Platt scaling",
          "The model already outputs values guaranteed to be in [0,1]",
          "There is enough data to fit a flexible, non-parametric monotonic mapping when miscalibration isn't simply sigmoid-shaped",
          "Isotonic regression is required whenever using a neural network instead of a tree model"
        ],
        "answer": 2,
        "explain": "Isotonic regression fits an arbitrary monotonic curve and needs more data than the two-parameter Platt/sigmoid fit, but is more flexible when miscalibration doesn't follow a sigmoid shape.",
        "tag": "isotonic vs Platt"
      }
    ],
    "short": [
      {
        "q": "Explain why calibration can drift over time in production recsys and how it's typically monitored and corrected.",
        "model": "Calibration drifts because of feature and label distribution shift — seasonality, new items/users, UI changes, or delayed labels — so a model calibrated at training time gradually becomes miscalibrated as production traffic evolves. It is typically monitored via reliability diagrams (predicted vs actual rate buckets) or a calibration ratio (sum of predicted probabilities divided by sum of actual outcomes), often computed per segment since global calibration can mask local miscalibration. Correction is done by periodically refitting a Platt/isotonic layer on fresh logged data or applying per-segment bias-correction terms.",
        "points": [
          "distribution shift (seasonality, new items/users, UI changes) causes drift",
          "monitored via reliability diagrams or predicted/actual ratio",
          "segment-level monitoring matters since global calibration can hide local bias",
          "corrected via periodic recalibration (Platt/isotonic) on fresh data"
        ],
        "tag": "calibration drift"
      }
    ]
  },
  "recsys-architectures": {
    "mcq": [
      {
        "q": "In the Wide & Deep architecture, what is the role of the \"wide\" component?",
        "options": [
          "Learning high-order nonlinear feature interactions via deep layers",
          "Generating item embeddings for ANN retrieval",
          "Performing final calibration of the model's output probabilities",
          "Memorization of sparse, specific feature co-occurrences via a linear model with cross-product features"
        ],
        "answer": 3,
        "explain": "The 'wide' linear component memorizes specific, sparse feature combinations, while the 'deep' MLP generalizes via learned embeddings and nonlinear interactions.",
        "tag": "wide & deep"
      },
      {
        "q": "Deep Interest Network (DIN) uses an attention mechanism over a user's historical interactions primarily to...",
        "options": [
          "Weight historical items by their relevance to the specific candidate item being scored, rather than a fixed average of all history",
          "Reduce the embedding dimensionality of items",
          "Replace the need for negative sampling",
          "Perform candidate generation instead of ranking"
        ],
        "answer": 0,
        "explain": "DIN's attention mechanism computes an activation weight for each historical item conditioned on the candidate item, so relevant history contributes more to the score.",
        "tag": "DIN attention"
      },
      {
        "q": "Compared to classic matrix factorization (which learns user and item embeddings purely from interaction IDs), what key advantage do two-tower neural architectures typically offer?",
        "options": [
          "Two-tower architectures guarantee a convex optimization landscape",
          "Two-tower architectures eliminate the need for an ANN index at serving time",
          "Two-tower towers can incorporate arbitrary side features (content, context, metadata), enabling generalization to new/cold users and items",
          "Two-tower architectures always require fewer training examples than matrix factorization"
        ],
        "answer": 2,
        "explain": "Unlike ID-only matrix factorization, two-tower models can fold in content/context features per tower, which helps generalize to cold-start users and items.",
        "tag": "two-tower vs MF"
      },
      {
        "q": "Why do architectures like DeepFM or DCN (Deep & Cross Network) add explicit feature-interaction components rather than relying solely on a deep MLP over concatenated embeddings?",
        "options": [
          "Plain MLPs cannot process categorical features at all",
          "Plain MLPs can in theory approximate any function, but empirically struggle to learn certain bounded-degree feature crosses efficiently, so explicit cross terms give a useful inductive bias",
          "Explicit feature crosses remove the need for embeddings entirely",
          "Feature crosses are required for the model to output valid probabilities"
        ],
        "answer": 1,
        "explain": "FM/DCN-style explicit interaction terms encode a useful inductive bias for multiplicative feature interactions that plain MLPs can approximate in theory but often learn poorly or inefficiently in practice.",
        "tag": "feature crosses"
      }
    ],
    "short": [
      {
        "q": "Compare two-tower architectures and cross-feature architectures (like DeepFM/DCN) in terms of where they're used in the pipeline and why.",
        "model": "Two-tower models are used at the candidate generation/retrieval stage because the user and item towers are independent, letting item embeddings be precomputed and searched via ANN for fast top-K retrieval over huge catalogs. Cross-feature architectures such as DeepFM, DCN, or Wide & Deep are used at the ranking stage over a much smaller candidate set, because they require joint user-item feature interactions computed at inference time and can't be precomputed. This gives higher accuracy at a higher per-pair compute cost, which is affordable once the candidate set has already been narrowed.",
        "points": [
          "two-tower -> retrieval stage: precomputable embeddings, ANN-friendly, cheap at scale",
          "cross-feature architectures -> ranking stage: joint interactions, not precomputable, costlier per item",
          "reflects the funnel design: trade scale for accuracy as candidates narrow",
          "choice of architecture is tied to which stage of the pipeline it serves"
        ],
        "tag": "retrieval vs ranking architectures"
      }
    ]
  },
  "recsys-metrics": {
    "mcq": [
      {
        "q": "What does NDCG (Normalized Discounted Cumulative Gain) capture that plain Precision@K does not?",
        "options": [
          "It ignores position entirely and only counts the number of relevant items retrieved",
          "It only works when relevance labels are binary",
          "It discounts the contribution of relevant items by their rank position and can incorporate graded (non-binary) relevance",
          "It measures training loss instead of ranking quality"
        ],
        "answer": 2,
        "explain": "NDCG applies a position-based discount (typically logarithmic) to gains and supports graded relevance, unlike Precision@K which just counts hits.",
        "tag": "NDCG"
      },
      {
        "q": "What is the key difference between a pairwise ranking loss (e.g., RankNet) and a pointwise loss (e.g., regression or logloss on individual items)?",
        "options": [
          "Pairwise loss directly penalizes incorrectly ordered pairs of items, optimizing relative order rather than absolute predicted scores",
          "Pairwise loss ignores relevance labels entirely",
          "Pointwise loss can only be used with neural network models",
          "Pairwise loss cannot be combined with gradient boosting"
        ],
        "answer": 0,
        "explain": "Pairwise losses like RankNet score a pair and penalize misordering, targeting relative rank rather than an absolute value the way pointwise regression or logloss does.",
        "tag": "pairwise loss"
      },
      {
        "q": "LambdaRank/LambdaMART modify pairwise ranking gradients by weighting them with |ΔNDCG| (the change in NDCG from swapping a pair). Why?",
        "options": [
          "To make training faster by skipping easy pairs entirely",
          "To convert the ranking problem into a plain regression problem",
          "To remove the need for negative sampling",
          "To make gradient updates proportional to how much swapping a pair would change the listwise metric, focusing learning on impactful swaps (e.g., near the top of the list)"
        ],
        "answer": 3,
        "explain": "LambdaRank/LambdaMART scale pairwise gradients by |ΔNDCG| so the model is pushed hardest to fix swaps that matter most for the final listwise ranking metric.",
        "tag": "LambdaMART"
      },
      {
        "q": "A model shows a solid NDCG improvement offline but no significant lift in an online A/B test. What is a common explanation?",
        "options": [
          "NDCG cannot actually be computed offline on logged data",
          "Offline metrics are computed on logged data reflecting the old policy's exposure and biases, and don't fully capture real user reactions to a new ranking (position bias, feedback loops, proxy misalignment)",
          "Online A/B tests always systematically underestimate true improvements",
          "The two metrics are mathematically identical so this discrepancy cannot occur"
        ],
        "answer": 1,
        "explain": "Offline evaluation on historical logs is confounded by the logging policy's exposure and position bias, so gains there don't always transfer to a live A/B test.",
        "tag": "offline-online gap"
      }
    ],
    "short": [
      {
        "q": "Explain why a recommender team might optimize a pointwise loss (e.g., logloss on CTR) during training but evaluate primarily with a listwise ranking metric like NDCG.",
        "model": "Pointwise losses such as logloss or regression are easier to optimize with standard gradient-based or GBM training, decompose cleanly per example, and are directly tied to well-calibrated probability outputs useful for downstream value computations like predicted CTR times predicted RPS. However, business success actually depends on the order of the final displayed list, so evaluation uses listwise metrics like NDCG or MRR that better reflect the position-weighted user experience. This mismatch between training objective and evaluation metric is common and is sometimes narrowed by adding pairwise or listwise loss terms, or LambdaMART-style gradient reweighting.",
        "points": [
          "pointwise loss is easier to optimize and yields calibrated, reusable probability outputs",
          "business/user experience depends on final list order, which listwise metrics measure",
          "NDCG/MRR are position-weighted, unlike simple pointwise loss",
          "gap can be narrowed with pairwise/listwise objectives or LambdaMART-style reweighting"
        ],
        "tag": "loss vs eval metric"
      }
    ]
  },
  "recsys-cold-start": {
    "mcq": [
      {
        "q": "The \"cold-start problem\" in recommender systems refers to...",
        "options": [
          "Slow model training caused by large data volume",
          "Overfitting caused by having too many features",
          "Difficulty making good recommendations for new users or new items with little or no historical interaction data",
          "The latency incurred by approximate nearest neighbor retrieval at serving time"
        ],
        "answer": 2,
        "explain": "Cold start specifically refers to the lack of interaction history for new users or items, which starves collaborative-signal-based models.",
        "tag": "cold-start definition"
      },
      {
        "q": "Which approach is most directly useful for addressing new-item cold start (an item with no interaction history)?",
        "options": [
          "Matrix factorization using only interaction IDs",
          "Increasing the size of the ANN index",
          "Raising the calibration threshold used for scoring",
          "Content-based features (text, image, category, metadata embeddings) that let the model score the item without relying on collaborative signal"
        ],
        "answer": 3,
        "explain": "With no interaction history, content and metadata-derived features are the main lever available to score a brand-new item.",
        "tag": "item cold start"
      },
      {
        "q": "For a brand-new user with no interaction history, which technique is commonly used?",
        "options": [
          "Content/context-based recommendations using demographics, device, referrer, or onboarding preferences, often blended with popularity-based defaults",
          "Pure collaborative filtering based on that user's past clicks",
          "Increasing the learning rate of the ranking model",
          "Applying only MMR diversity re-ranking"
        ],
        "answer": 0,
        "explain": "With no click history, systems fall back to context and demographic signals plus popularity priors until enough behavioral data accumulates.",
        "tag": "user cold start"
      },
      {
        "q": "Why are multi-armed bandit / exploration strategies often paired with cold-start handling for new items?",
        "options": [
          "They guarantee the new item will rank first on every request",
          "They intentionally allocate some traffic to under-tried (new) items to gather feedback efficiently, balancing risk against the value of learning true performance",
          "They remove the need for any content-based features",
          "They are only used for probability calibration"
        ],
        "answer": 1,
        "explain": "Bandit exploration deliberately spends some traffic on new or unproven items so the system can learn their true value quickly, which is exactly the cold-start challenge.",
        "tag": "bandit exploration"
      }
    ],
    "short": [
      {
        "q": "Describe a hybrid strategy a production system might use to handle new-item cold start while limiting risk to user experience.",
        "model": "A common hybrid approach blends content-based scoring using item metadata or embeddings as a substitute for missing collaborative signal, combined with a bandit-style exploration budget (e.g., epsilon-greedy or Thompson sampling) that allocates limited traffic to new items to collect real feedback quickly. As interaction data accumulates, the system gradually shifts weight from content-based priors toward the learned collaborative signal, often using Bayesian shrinkage toward a prior such as population CTR until enough impressions have been logged.",
        "points": [
          "content-based scoring as a fallback in the absence of collaborative signal",
          "bounded exploration budget (bandit) to gather feedback without full risk exposure",
          "gradual shift from prior/content signal to learned signal as data accumulates",
          "shrinkage toward a population prior avoids noisy small-sample estimates"
        ],
        "tag": "cold-start hybrid strategy"
      }
    ]
  },
  "recsys-multi-armed-bandit": {
    "mcq": [
      {
        "q": "The fundamental trade-off a multi-armed bandit algorithm must balance is...",
        "options": [
          "Precision vs recall in the retrieved candidate set",
          "Calibration vs discrimination of predicted probabilities",
          "Bias vs variance in feature engineering choices",
          "Exploration (trying less-certain options to learn their value) vs exploitation (choosing the currently best-known option)"
        ],
        "answer": 3,
        "explain": "This exploration/exploitation tension is the defining problem multi-armed bandit algorithms are designed to solve.",
        "tag": "explore/exploit"
      },
      {
        "q": "Upper Confidence Bound (UCB) algorithms select the arm with the highest...",
        "options": [
          "Sum of estimated mean reward plus an uncertainty bonus that shrinks with more data, favoring under-explored arms",
          "Raw average observed reward only, ignoring uncertainty",
          "Uniformly random value regardless of past rewards",
          "Predicted CTR multiplied by bid value only"
        ],
        "answer": 0,
        "explain": "UCB explicitly adds a confidence/uncertainty term to the mean estimate so arms with fewer samples get an exploration bonus.",
        "tag": "UCB"
      },
      {
        "q": "Thompson sampling selects an arm by...",
        "options": [
          "Always picking the arm with the highest historical average reward",
          "Uniformly random selection at all times, independent of any feedback",
          "Sampling a reward estimate from each arm's posterior distribution and picking the arm with the highest sample, naturally balancing exploration and exploitation",
          "Sorting arms by their NDCG score"
        ],
        "answer": 2,
        "explain": "Thompson sampling draws a random sample per arm from its current posterior belief, so arms with more uncertainty occasionally get sampled high enough to be explored.",
        "tag": "Thompson sampling"
      },
      {
        "q": "How does a contextual bandit differ from a standard (context-free) multi-armed bandit?",
        "options": [
          "Contextual bandits ignore reward feedback entirely once trained",
          "Contextual bandits choose actions based on side information (context) available at decision time, letting the optimal arm vary by context rather than being fixed globally",
          "Contextual bandits require purely offline evaluation and cannot serve live traffic",
          "Contextual bandits cannot incorporate any exploration"
        ],
        "answer": 1,
        "explain": "The defining feature of contextual bandits is conditioning the arm-selection policy on observed context features, unlike a context-free bandit that has one global best arm.",
        "tag": "contextual bandits"
      }
    ],
    "short": [
      {
        "q": "Explain what \"regret\" means in the bandit setting and why minimizing cumulative regret is the standard objective.",
        "model": "Regret is the difference between the reward that would have been obtained by always pulling the best possible arm in hindsight and the reward actually obtained by the algorithm's choices over time. Minimizing cumulative regret is the standard bandit objective because it directly measures the cost of exploration and learning while still crediting good exploitation. Algorithms like UCB and Thompson sampling have provable sublinear (e.g., logarithmic) regret bounds, meaning the average per-round loss from exploration vanishes as more rounds are played.",
        "points": [
          "regret = gap between algorithm's reward and the best-in-hindsight arm's reward",
          "measures the cost of exploration/learning over time",
          "UCB and Thompson sampling have provable sublinear (e.g., logarithmic) regret bounds",
          "used to compare and design bandit algorithms theoretically"
        ],
        "tag": "regret"
      }
    ]
  },
  "recsys-multi-objective": {
    "mcq": [
      {
        "q": "Why do production recommender systems typically optimize a combination of multiple objectives (e.g., click-through rate, revenue, diversity, dwell time) rather than a single metric?",
        "options": [
          "Because computing a single objective is computationally infeasible at scale",
          "Multi-objective models always train faster than single-objective ones",
          "Optimizing one metric alone (e.g., pure CTR) can produce degenerate outcomes like clickbait, so real systems balance several complementary goals",
          "Single-objective models cannot be trained with gradient descent"
        ],
        "answer": 2,
        "explain": "Pure CTR or engagement optimization is well known to drift toward clickbait or short-term engagement, hence blending in revenue, quality, and satisfaction signals.",
        "tag": "why multi-objective"
      },
      {
        "q": "A common simple approach to multi-objective ranking is \"scalarization\" — what does this mean?",
        "options": [
          "Combining multiple objective scores into a single weighted scalar score (e.g., predicted CTR × predicted value) used for ranking, per business-chosen weights",
          "Training completely separate models that never share any representation",
          "Selecting only the single most important objective and permanently discarding the rest",
          "Normalizing all objectives to zero mean/unit variance without ever combining them"
        ],
        "answer": 0,
        "explain": "Scalarization is literally reducing a vector of objectives to one number via a weighted combination, which is then used directly for ranking.",
        "tag": "scalarization"
      },
      {
        "q": "In multi-objective optimization, a solution is \"Pareto optimal\" if...",
        "options": [
          "It maximizes every objective simultaneously to its theoretical maximum",
          "It has the highest single combined scalar score among all candidates",
          "It ignores all but one objective by construction",
          "No objective can be improved without making at least one other objective worse"
        ],
        "answer": 3,
        "explain": "That is the textbook definition of Pareto optimality — no further improvement in one dimension is possible without a trade-off elsewhere.",
        "tag": "Pareto optimality"
      },
      {
        "q": "In a multi-task learning setup where one network jointly predicts CTR and RPS, what is the main benefit of sharing lower-level representations/layers between the two tasks?",
        "options": [
          "It guarantees both tasks reach exactly identical accuracy",
          "Related tasks can share statistical strength through shared representations, often improving generalization versus fully independent models, especially when one task has sparser labels",
          "It eliminates the need for separate loss functions per task",
          "It removes the need for calibration on either task's output"
        ],
        "answer": 1,
        "explain": "Multi-task learning benefits from shared lower layers acting as a form of regularization and cross-task signal transfer, particularly helpful when one label is scarcer than the other.",
        "tag": "multi-task learning"
      }
    ],
    "short": [
      {
        "q": "Describe a risk of naive linear scalarization of objectives (e.g., predicted CTR × predicted RPS to approximate RPM) and one mitigation.",
        "model": "Naive scalarization assumes the relative weighting of objectives is fixed and known, but the right trade-off can vary by context such as segment or inventory type, and an error in one component (e.g., miscalibrated CTR) directly distorts the combined score even if ranking by that component alone would be fine. Mitigations include calibrating each component model independently, using constrained optimization such as maximizing revenue subject to a relevance/quality floor instead of one scalar, or learning segment-specific weights rather than a single global fixed weight.",
        "points": [
          "fixed global weights don't fit every context/segment equally well",
          "miscalibration in one factor multiplies through and corrupts the combined score",
          "mitigation: calibrate each component independently before combining",
          "mitigation: constrained optimization or segment-specific weighting instead of one fixed scalar"
        ],
        "tag": "scalarization risk"
      }
    ]
  },
  "recsys-bias": {
    "mcq": [
      {
        "q": "\"Position bias\" in recommender system logs refers to the phenomenon that...",
        "options": [
          "Items are recommended more often simply because they are newer",
          "Bias affects only offline evaluation and never online serving",
          "Users always prefer whichever item is shown last in a list",
          "Items shown in higher/more prominent positions receive more clicks/attention regardless of their true relevance, confounding naive click analysis"
        ],
        "answer": 3,
        "explain": "Position bias is the well-documented tendency for placement/prominence to drive clicks independent of true relevance.",
        "tag": "position bias"
      },
      {
        "q": "A common technique to correct for position bias when training a ranking model from click logs is...",
        "options": [
          "Ignoring position entirely and training as though all positions were equally likely to be seen",
          "Only ever training on items that were shown in position 1",
          "Modeling click probability as examination probability (depends on position) times relevance probability (depends on item), then using this to de-bias labels or as an auxiliary feature",
          "Randomizing the true observed labels before training"
        ],
        "answer": 2,
        "explain": "Click models that factorize P(click) = P(examine|position) × P(relevant) are the standard way to separate position effects from true relevance in log-based training.",
        "tag": "click model correction"
      },
      {
        "q": "What is \"feedback loop\" (or exposure) bias in recommender systems?",
        "options": [
          "Items/strategies shown more often accumulate more interaction data, reinforcing the model's confidence in them and further increasing their future exposure, starving under-exposed items of feedback",
          "A bias that is entirely due to the choice of loss function used during training",
          "A bias that only occurs in offline batch training pipelines, never in live serving",
          "The requirement to recalibrate a model on a weekly cadence"
        ],
        "answer": 0,
        "explain": "This self-reinforcing exposure-to-data-to-more-exposure cycle is exactly the feedback loop bias problem, distinct from position bias.",
        "tag": "feedback loop bias"
      },
      {
        "q": "\"Popularity bias\" describes a recommender's tendency to...",
        "options": [
          "Always underperform specifically on popular/head items",
          "Systematically favor already-popular items over niche/long-tail items even when the niche item may be equally or more relevant, partly due to disparity in training signal volume",
          "Occur only in purely content-based recommenders",
          "Resolve automatically as soon as a model converges during training"
        ],
        "answer": 1,
        "explain": "Popularity bias is the well-known skew toward head items because they dominate training signal, regardless of true relevance for a given user.",
        "tag": "popularity bias"
      }
    ],
    "short": [
      {
        "q": "Explain how position bias and exposure/feedback-loop bias interact to make evaluating a new ranking strategy from historical logs difficult, and one way to address it.",
        "model": "Historical logs reflect what the previous policy chose to show and where, so a candidate that was rarely shown (exposure bias) or only shown in low positions (position bias) will have very little, weak signal in the logs, making it look worse than it truly is under naive offline evaluation. This compounds over time into a feedback loop that entrenches incumbent strategies further. Mitigations include randomized exploration or logged propensities, so counterfactual/inverse-propensity-scoring-based offline evaluation can correctly reweight observed outcomes by how likely each item was to be shown.",
        "points": [
          "logs reflect the old policy's exposure and position choices, not ground truth relevance",
          "rarely-shown or low-position items get weak/sparse signal, biasing naive offline evaluation",
          "this compounds into a feedback loop entrenching incumbent strategies",
          "mitigation: randomized exploration + logged propensities enabling IPS/counterfactual evaluation"
        ],
        "tag": "position + exposure bias interaction"
      }
    ]
  },
  "recsys-transformer": {
    "mcq": [
      {
        "q": "Why are transformer/self-attention architectures (e.g., SASRec) attractive for sequential recommendation compared to RNN-based models (e.g., GRU4Rec)?",
        "options": [
          "Self-attention can directly weigh the relevance of any past item to the next prediction in parallel, without the sequential recurrence bottleneck of RNNs, often capturing longer-range dependencies better",
          "Transformers require no positional information about the sequence at all",
          "Transformers cannot be trained with a masked or next-item prediction objective",
          "Transformers eliminate the need for item embeddings entirely"
        ],
        "answer": 0,
        "explain": "Self-attention computes pairwise relevance across the whole sequence in parallel, avoiding RNNs' sequential bottleneck and often modeling longer-range dependencies better.",
        "tag": "self-attention vs RNN"
      },
      {
        "q": "In an autoregressive (next-item-prediction) transformer for sequential recommendation like SASRec, why is causal masking applied in the self-attention layers?",
        "options": [
          "To speed up matrix multiplication using sparse matrix tricks",
          "To remove the need for positional encodings in the model",
          "To prevent a position from attending to future items in the sequence, ensuring predictions use only past interactions (avoiding label leakage)",
          "To implement the multi-head attention mechanism itself"
        ],
        "answer": 2,
        "explain": "Causal masking blocks attention to future positions so an autoregressive next-item model can't 'cheat' by seeing the answer during training.",
        "tag": "causal masking"
      },
      {
        "q": "BERT4Rec differs from SASRec's autoregressive approach mainly in that it...",
        "options": [
          "Uses no attention mechanism at all, relying purely on convolution",
          "Trains with a masked-item (cloze-style) objective, allowing bidirectional attention over the whole sequence rather than only attending to prior items",
          "Cannot be used for next-item prediction at inference time",
          "Removes positional encodings entirely from the architecture"
        ],
        "answer": 1,
        "explain": "BERT4Rec adapts BERT's masked-language-model idea to item sequences, enabling bidirectional context unlike SASRec's strictly causal/autoregressive setup.",
        "tag": "BERT4Rec vs SASRec"
      },
      {
        "q": "Why must positional information be explicitly injected into a transformer used for sequential recommendation?",
        "options": [
          "Item embeddings already implicitly encode temporal order without extra help",
          "Positional encodings are only needed for natural language text, not item sequences",
          "Positional encoding replaces the need for item embeddings entirely",
          "Self-attention itself is permutation-invariant (treats the sequence as an unordered set), so without positional encodings the model loses information about interaction order"
        ],
        "answer": 3,
        "explain": "Without explicit positional signals, self-attention has no inherent notion of sequence order, which matters a great deal in sequential recommendation.",
        "tag": "positional encoding"
      }
    ],
    "short": [
      {
        "q": "Describe one practical challenge in applying transformer-based sequential models to a production recommender system with very long or sparse user histories, and a common mitigation.",
        "model": "Self-attention's compute and memory cost grows quadratically with sequence length, which is problematic for users with very long histories, while many other users have short or sparse histories that make it hard to learn robust sequential patterns. Common mitigations include truncating or windowing histories to a fixed recent length, using efficient or sparse attention variants to control the quadratic cost, or blending in non-sequential fallback signals such as content or popularity for users whose history is too short to model reliably.",
        "points": [
          "quadratic compute/memory cost with sequence length for long histories",
          "short/sparse histories hurt the model's ability to learn sequential patterns",
          "mitigation: truncation/windowing to a fixed recent length",
          "mitigation: efficient attention variants or blending in fallback (content/popularity) signals for sparse users"
        ],
        "tag": "long sequence handling"
      }
    ]
  },
  "ann-similarity-search": {
    "mcq": [
      {
        "q": "Why do large-scale vector similarity search systems use Approximate Nearest Neighbor (ANN) methods instead of exact brute-force search?",
        "options": [
          "ANN methods are always strictly more accurate than brute-force exact search",
          "Brute-force exact search is O(N) per query, too slow/costly at scale; ANN indexes trade a small, controllable amount of accuracy for large speedups",
          "Exact nearest-neighbor search cannot mathematically be defined for high-dimensional vectors",
          "ANN is required by definition for cosine similarity but not for Euclidean distance"
        ],
        "answer": 1,
        "explain": "The whole motivation for ANN is that linear-scan exact search doesn't scale to huge vector sets under tight latency budgets, so approximate methods trade recall for speed.",
        "tag": "ANN vs brute force"
      },
      {
        "q": "HNSW (Hierarchical Navigable Small World) achieves fast approximate search primarily by...",
        "options": [
          "Building a multi-layer proximity graph where greedy traversal from sparse upper layers quickly navigates toward a query's approximate neighborhood in the dense bottom layer",
          "Clustering vectors into buckets and only ever searching the single nearest bucket",
          "Storing all vectors in a sorted array and performing binary search",
          "Compressing each vector down to a single bit before comparison"
        ],
        "answer": 0,
        "explain": "HNSW's core idea is a hierarchical navigable-small-world graph: upper sparse layers let greedy search jump close quickly, then finer layers refine the result.",
        "tag": "HNSW"
      },
      {
        "q": "In an IVF (Inverted File Index) approach to ANN search, the `nprobe` parameter controls...",
        "options": [
          "The dimensionality of the stored vectors",
          "The number of hash functions used in locality-sensitive hashing",
          "The number of layers present in an HNSW graph",
          "How many of the nearest coarse clusters (from the initial partitioning) are actually searched at query time, trading recall for speed"
        ],
        "answer": 3,
        "explain": "nprobe is IVF's key recall/speed knob: searching more clusters raises recall at the cost of latency.",
        "tag": "IVF nprobe"
      },
      {
        "q": "Product Quantization (PQ) is used in ANN systems primarily to...",
        "options": [
          "Increase the exact precision of distance computations beyond standard floating point",
          "Replace the need for any indexing structure whatsoever",
          "Compress high-dimensional vectors into compact codes via sub-vector codebooks, drastically reducing memory footprint and speeding up approximate distance computation, at some accuracy cost",
          "Guarantee exact nearest-neighbor results every time"
        ],
        "answer": 2,
        "explain": "PQ's purpose is memory and speed compression via learned sub-vector codebooks, accepting an approximation in the distance calculation.",
        "tag": "product quantization"
      }
    ],
    "short": [
      {
        "q": "Explain the recall/latency/memory trade-off an engineer must tune when deploying an ANN index (e.g., HNSW) in a production similarity-search endpoint, and name two tunable parameters.",
        "model": "Deploying an ANN index requires balancing three competing goals: query latency, recall (the fraction of true nearest neighbors actually found), and memory or index-build cost, where improving one typically worsens another — for example, higher recall usually needs more distance computations or graph connections, which increases both latency and memory. For HNSW, the key tunable parameters are `M` (graph connectivity per node, affecting memory and recall) and `ef_search`/`ef_construction` (how many candidates are explored during search or build, trading latency for recall); for IVF-style indexes, `nprobe` (number of clusters searched) plays an analogous role.",
        "points": [
          "three-way trade-off between latency, recall, and memory/index cost",
          "HNSW parameters: M (graph connectivity) and ef_search/ef_construction (search breadth)",
          "IVF's nprobe is an analogous recall/latency knob",
          "tuning is workload- and SLA-specific, not a one-size-fits-all setting"
        ],
        "tag": "recall-latency-memory tradeoff"
      }
    ]
  },
  "vit": {
    "mcq": [
      {
        "q": "How does ViT convert an image into a sequence for the Transformer encoder?",
        "options": [
          "It runs a CNN backbone to extract feature maps and flattens them",
          "It splits the image into fixed-size non-overlapping patches, linearly projects each flattened patch into an embedding, and adds positional embeddings",
          "It uses a recurrent network to scan the image pixel by pixel",
          "It applies a Fourier transform to the raw pixels"
        ],
        "answer": 1,
        "explain": "ViT's core trick is patchifying the image into fixed-size patches, linearly embedding each, and adding positional embeddings to form a token sequence.",
        "tag": "patch embedding"
      },
      {
        "q": "Why does the original ViT typically underperform CNNs when trained on small/mid-sized datasets from scratch?",
        "options": [
          "ViT has more parameters than any CNN by design",
          "ViT lacks the built-in inductive biases of convolutions (locality, translation equivariance), so it needs more data or stronger regularization/augmentation to learn these patterns",
          "ViT cannot process RGB images",
          "ViT does not use any positional information"
        ],
        "answer": 1,
        "explain": "Without convolution's locality and weight-sharing priors, ViT must learn spatial structure from data alone, making it less data-efficient at smaller scales.",
        "tag": "inductive bias"
      },
      {
        "q": "What is the purpose of the learnable [CLS] token prepended to the patch sequence in ViT?",
        "options": [
          "It marks the end of the input sequence for the tokenizer",
          "Its final-layer representation is used as an aggregate image representation for classification",
          "It replaces the need for positional embeddings",
          "It is discarded before the encoder and never used"
        ],
        "answer": 1,
        "explain": "The [CLS] token accumulates global information through self-attention across layers and its final embedding is fed to the classification head.",
        "tag": "CLS token"
      },
      {
        "q": "How does self-attention in ViT fundamentally differ from convolution in terms of receptive field?",
        "options": [
          "Self-attention has a fixed small local receptive field like a 3x3 convolution",
          "Self-attention lets each patch attend to all other patches in a single layer, giving a global receptive field from the first layer, unlike convolution's local receptive field that grows only gradually with depth",
          "Self-attention has no receptive field concept at all",
          "Convolution has a global receptive field from its very first layer"
        ],
        "answer": 1,
        "explain": "Self-attention computes interactions between every pair of tokens, so even the first layer has a global receptive field, unlike convolutions which need many stacked layers to reach global context.",
        "tag": "global attention vs local convolution"
      }
    ],
    "short": [
      {
        "q": "Explain why ViT needs large-scale pretraining data (or distillation/augmentation) to match CNN performance, referencing inductive bias.",
        "model": "CNNs have built-in inductive biases—locality and translation equivariance from convolution and weight sharing—that make them naturally data-efficient for image tasks. ViT replaces convolutions with self-attention, which has no such built-in spatial prior; it must learn these patterns purely from data. As a result, on small/medium datasets ViT tends to underperform CNNs, but when pretrained on very large datasets (e.g., JFT-300M) or with strong regularization/data augmentation/distillation (as in DeiT), it can match or exceed CNN performance because it can learn more flexible, less-biased representations.",
        "points": [
          "CNNs: built-in locality/translation equivariance",
          "ViT: no spatial inductive bias, learns from data",
          "underperforms CNN on small data, needs scale or augmentation/distillation",
          "at scale can outperform CNNs due to flexibility"
        ],
        "tag": "data efficiency vs scale"
      }
    ]
  },
  "receptive-field": {
    "mcq": [
      {
        "q": "What is the 'receptive field' of a neuron in a CNN?",
        "options": [
          "The set of all possible output classes it can predict",
          "The region of the input image that can influence that neuron's activation",
          "The number of parameters in that layer",
          "The learning rate applied to that neuron"
        ],
        "answer": 1,
        "explain": "Receptive field refers strictly to the spatial extent of the input that feeds into (and can affect) a given unit's output.",
        "tag": "receptive field definition"
      },
      {
        "q": "Which of the following increases a CNN's receptive field size for a fixed number of layers?",
        "options": [
          "Using dilated (atrous) convolutions to skip input pixels while keeping kernel size fixed",
          "Reducing the number of channels in each layer",
          "Using a smaller learning rate during training",
          "Removing all pooling layers and reducing stride to 1 everywhere"
        ],
        "answer": 0,
        "explain": "Dilated convolutions space out the kernel taps, covering a wider input area per layer without adding parameters or extra layers.",
        "tag": "dilated convolution"
      },
      {
        "q": "What is the difference between the 'theoretical' and 'effective' receptive field?",
        "options": [
          "They are always identical in practice",
          "The theoretical receptive field is the full region that mathematically could influence a unit; the effective receptive field is typically smaller, since pixel contributions are non-uniform and concentrate near the center in roughly a Gaussian-like distribution",
          "The effective receptive field is always larger than the theoretical one",
          "Effective receptive field refers only to the network's very first layer"
        ],
        "answer": 1,
        "explain": "Empirically, contribution to a unit's activation is concentrated near the center of the theoretical receptive field and decays outward, so the effective influence is smaller than the full theoretical extent.",
        "tag": "effective receptive field"
      },
      {
        "q": "Why is receptive field size an important consideration when designing a segmentation or detection network?",
        "options": [
          "It has no real effect on the network's ability to recognize large objects or gather context",
          "The receptive field must be large enough to capture sufficient context (e.g., to recognize large objects or understand scene-level context), otherwise the network can only make decisions based on very local information",
          "Larger receptive fields always reduce the number of parameters",
          "It solely affects training speed and nothing else"
        ],
        "answer": 1,
        "explain": "Dense prediction tasks need enough context to correctly interpret large or ambiguous structures, so insufficient receptive field limits accuracy regardless of other design choices.",
        "tag": "receptive field for dense prediction"
      }
    ],
    "short": [
      {
        "q": "Explain how stacking convolutional layers, pooling, and dilation each affect the growth of the receptive field, and why this matters for dense prediction tasks.",
        "model": "Each additional convolution layer grows the receptive field linearly with kernel size, since a unit now depends on a wider window of the previous layer's units; pooling/strided convolutions grow it multiplicatively because they downsample, so subsequent layers' fixed-size kernels cover a proportionally larger area of the original input. Dilated convolutions expand the receptive field without adding parameters or reducing spatial resolution, by spacing out kernel taps. For dense prediction tasks like segmentation, ensuring the receptive field is large enough to capture object-level or scene-level context (without losing resolution from too much pooling) is critical for accurate per-pixel predictions.",
        "points": [
          "stacking layers grows RF linearly with kernel size",
          "pooling/stride grows RF multiplicatively via downsampling",
          "dilated convolutions grow RF without added params/resolution loss",
          "segmentation needs large RF for context while preserving resolution"
        ],
        "tag": "receptive field growth"
      }
    ]
  },
  "CLIP": {
    "mcq": [
      {
        "q": "What training objective does CLIP use to align image and text representations?",
        "options": [
          "A cross-entropy classification loss over a fixed set of ImageNet classes",
          "A contrastive loss that pulls matched image-text pairs together and pushes apart mismatched pairs within a batch (a symmetric InfoNCE-style loss over a similarity matrix)",
          "A masked-language-modeling loss applied only to the text encoder",
          "A pixel-level reconstruction loss between generated and real images"
        ],
        "answer": 1,
        "explain": "CLIP trains with a symmetric contrastive loss over image-text similarity scores computed across a batch, not a fixed classification task.",
        "tag": "contrastive loss"
      },
      {
        "q": "How does CLIP perform zero-shot image classification on a new dataset without any task-specific fine-tuning?",
        "options": [
          "It fine-tunes the image encoder on the new dataset's labeled examples first",
          "It embeds the image and embeds text prompts constructed from each candidate class name (e.g. 'a photo of a {class}'), then picks the class whose text embedding has the highest similarity to the image embedding",
          "It requires a separate classifier head trained per dataset",
          "It uses nearest-neighbor lookup against ImageNet training images only"
        ],
        "answer": 1,
        "explain": "Zero-shot classification in CLIP works by comparing the image embedding to text embeddings of candidate class prompts and choosing the closest match, no fine-tuning needed.",
        "tag": "zero-shot classification"
      },
      {
        "q": "Why does CLIP use two separate encoders (one for images, one for text) instead of a single fused encoder?",
        "options": [
          "A fused encoder is always faster to run than dual encoders",
          "Dual encoders allow independently computing and caching embeddings for large-scale retrieval/contrastive training over massive batches efficiently, comparing embeddings via a simple similarity (e.g. dot product) rather than jointly processing every pair",
          "Fused encoders cannot process images at all",
          "Text encoders and image encoders must always share the same weights"
        ],
        "answer": 1,
        "explain": "Separate encoders let embeddings be precomputed and compared cheaply (e.g., via dot product), which scales efficiently to huge batches needed for contrastive training and retrieval.",
        "tag": "dual-encoder efficiency"
      },
      {
        "q": "What is a known limitation of CLIP related to its training data and objective?",
        "options": [
          "It cannot process natural images at all",
          "It can be sensitive to prompt wording and struggles with fine-grained/compositional understanding (e.g., counting, spatial relationships) since it was trained mainly on noisy web image-caption pairs with a coarse matching objective",
          "It requires labeled ImageNet classes for training",
          "It has zero ability to generalize beyond its exact training distribution"
        ],
        "answer": 1,
        "explain": "CLIP's coarse contrastive matching over noisy web captions doesn't force precise compositional reasoning, so it can be brittle on counting, spatial relations, and prompt phrasing.",
        "tag": "CLIP limitations"
      }
    ],
    "short": [
      {
        "q": "Explain how CLIP's contrastive pretraining enables zero-shot transfer to arbitrary classification tasks, and one limitation of this approach.",
        "model": "CLIP jointly trains an image encoder and text encoder on hundreds of millions of image-caption pairs using a contrastive objective, so that embeddings of a matching image and caption are close in a shared representation space while non-matching pairs are pushed apart. Because natural language descriptions serve as the 'labels,' CLIP learns a broad, open-vocabulary visual-semantic space rather than being tied to a fixed label set, letting it classify images into any set of classes just by embedding the class names as text prompts at inference and picking the closest match. A key limitation is that its coarse image-caption matching objective doesn't force fine-grained compositional understanding, so it can be brittle on tasks needing precise counting, spatial reasoning, or attribute binding, and results are sensitive to prompt phrasing.",
        "points": [
          "contrastive loss aligns matched image-text embeddings",
          "open vocabulary: no fixed label set, text prompts define classes at inference",
          "zero-shot via embedding similarity to prompt text",
          "limitation: coarse matching struggles with compositional/fine-grained reasoning"
        ],
        "tag": "zero-shot transfer"
      }
    ]
  },
  "VLM": {
    "mcq": [
      {
        "q": "At a high level, what is the core architectural challenge that Vision-Language Models must solve?",
        "options": [
          "How to bridge two different modalities (continuous visual features and discrete language tokens) into a shared representation space the language model can reason over",
          "How to make the image encoder run without any GPU",
          "How to remove the need for any text input entirely",
          "How to train exclusively on unlabeled video data"
        ],
        "answer": 0,
        "explain": "VLMs must reconcile continuous visual embeddings with the discrete token space of a language model so both can be jointly reasoned over.",
        "tag": "multimodal alignment challenge"
      },
      {
        "q": "What is a common approach for connecting a pretrained vision encoder to a pretrained LLM in modern VLMs?",
        "options": [
          "Training both from scratch jointly with no pretraining at all",
          "A lightweight adapter/projection module (e.g., an MLP or cross-attention resampler like Q-Former) maps visual features into the LLM's token/embedding space, often keeping much of both pretrained models frozen or lightly fine-tuned",
          "Concatenating raw pixel values directly into the LLM's vocabulary as new tokens with no learned mapping",
          "Running the LLM entirely on quantized image histograms"
        ],
        "answer": 1,
        "explain": "Most modern VLMs reuse strong pretrained unimodal models and connect them with a small trainable projector, which is far more efficient than training everything from scratch.",
        "tag": "vision-language connector"
      },
      {
        "q": "What is 'visual grounding' in the context of VLMs?",
        "options": [
          "Training the vision encoder using only text data",
          "Localizing/associating specific regions or objects in an image with corresponding words or phrases in text (e.g., a referring expression to a bounding box)",
          "Ensuring the model never hallucinates any output",
          "A technique to compress image resolution before encoding"
        ],
        "answer": 1,
        "explain": "Visual grounding refers to linking language references to specific spatial regions or objects within the image, as in referring expression comprehension.",
        "tag": "visual grounding"
      },
      {
        "q": "Why do many VLMs freeze or lightly fine-tune the pretrained vision encoder and LLM while only training a small connector module?",
        "options": [
          "It is impossible to fine-tune large pretrained models under any circumstance",
          "It preserves the strong general capabilities already learned during large-scale unimodal pretraining while being far more compute/data-efficient than training everything from scratch or fully fine-tuning both massive models",
          "Frozen weights make gradient computation twice as fast in general",
          "It guarantees zero hallucination in generated text"
        ],
        "answer": 1,
        "explain": "Freezing large pretrained components preserves their learned capabilities and drastically reduces the compute/data needed compared to full end-to-end training.",
        "tag": "frozen backbone training efficiency"
      }
    ],
    "short": [
      {
        "q": "Describe the main components of a typical VLM pipeline and the main challenge of multimodal alignment.",
        "model": "A typical VLM combines a pretrained vision encoder (e.g., a ViT or CLIP-style encoder) that turns an image into a set of visual feature vectors, a connector/projection module that maps those features into the embedding space the language model expects, and a pretrained LLM that consumes the projected visual tokens alongside text tokens to generate language output. The main challenge is multimodal alignment: ensuring the visual features are represented in a way the LLM can meaningfully attend to and reason about jointly with text, which is typically solved via a training phase on paired image-text data that teaches the connector (and sometimes lightly fine-tunes the encoder/LLM) to align the two modalities.",
        "points": [
          "vision encoder extracts visual features",
          "connector/projector maps features into LLM embedding space",
          "LLM consumes joint visual+text tokens to generate output",
          "alignment learned via paired image-text training data"
        ],
        "tag": "VLM pipeline"
      }
    ]
  },
  "vision-language-models": {
    "mcq": [
      {
        "q": "What distinguishes a 'dual-encoder' VLM architecture (e.g., CLIP) from a 'fusion-encoder' architecture?",
        "options": [
          "Dual-encoder architectures process image and text independently and compare embeddings (e.g., via similarity), while fusion-encoder architectures jointly process image and text together with cross-modal attention to produce a fused representation",
          "Dual-encoders always require labeled classification data to function",
          "Fusion-encoders cannot perform any retrieval tasks",
          "There is no meaningful architectural difference between the two"
        ],
        "answer": 0,
        "explain": "Dual-encoders keep modalities separate until a final similarity comparison, while fusion-encoders interact the modalities within the network via cross-attention or joint layers.",
        "tag": "dual-encoder vs fusion-encoder"
      },
      {
        "q": "In the Flamingo-style architecture, how are visual features integrated into the frozen language model?",
        "options": [
          "Visual features are appended as extra vocabulary tokens learned via masked language modeling",
          "Newly inserted gated cross-attention layers interleaved between the frozen LLM's layers attend to the visual features, letting the LLM incorporate visual context while its original weights remain frozen",
          "The image is converted to text captions only, with no learned visual features used",
          "The LLM is fully retrained end-to-end alongside the vision encoder"
        ],
        "answer": 1,
        "explain": "Flamingo inserts new gated cross-attention layers between frozen LLM blocks so the LLM can attend to visual features without modifying its original pretrained weights.",
        "tag": "Flamingo cross-attention"
      },
      {
        "q": "What is the role of the Q-Former (Querying Transformer) in BLIP-2's architecture?",
        "options": [
          "It replaces the LLM entirely for text generation",
          "It uses a fixed small set of learnable query embeddings that attend to the frozen vision encoder's features, extracting a compact set of visual tokens to feed into the frozen LLM, bridging the two frozen models efficiently",
          "It performs data augmentation on raw pixels before encoding",
          "It is used only during loss computation and discarded at inference"
        ],
        "answer": 1,
        "explain": "Q-Former uses learnable queries to distill the vision encoder's output into a small, informative set of visual tokens compatible with the frozen LLM, at both train and inference time.",
        "tag": "Q-Former"
      },
      {
        "q": "Compared to dual-encoder models like CLIP, why are cross-attention/fusion-based VLM architectures generally better suited for tasks like visual question answering (VQA) or captioning?",
        "options": [
          "Because fusion architectures allow deep, token-level interaction between visual and textual representations needed for generative, fine-grained reasoning, whereas dual-encoders only produce a single global similarity score, well suited to retrieval/classification but not language generation",
          "Because dual-encoder models cannot process images containing more than one object",
          "Because fusion architectures are always smaller in total parameter count",
          "Because dual-encoder models require labeled bounding boxes for every image"
        ],
        "answer": 0,
        "explain": "Generative tasks like VQA/captioning need rich, token-level cross-modal interaction to produce coherent language grounded in visual detail, which fusion architectures provide but dual-encoders' single similarity score does not.",
        "tag": "architecture choice for generation"
      }
    ],
    "short": [
      {
        "q": "Compare dual-encoder, cross-attention, and Q-Former-style connector architectures for VLMs, and when each is preferable.",
        "model": "Dual-encoder architectures (like CLIP) embed images and text independently into a shared space and compare via similarity, making them fast and well suited to large-scale retrieval and zero-shot classification but not generative tasks. Cross-attention/fusion architectures (like Flamingo) interleave attention layers between a frozen LLM's blocks that let text tokens attend directly to visual features, enabling deep token-level multimodal reasoning needed for open-ended generation, VQA, and captioning. Q-Former-style connectors (like BLIP-2) sit between a frozen vision encoder and frozen LLM, using a small set of learnable queries to compress and select relevant visual information, offering an efficient middle ground that avoids retraining either large pretrained model while still enabling rich generative multimodal capability.",
        "points": [
          "dual-encoder: independent embeddings + similarity, fast retrieval/zero-shot classification",
          "cross-attention (Flamingo): deep token-level fusion for generation/VQA",
          "Q-Former (BLIP-2): learnable queries compress visual features, bridges frozen encoder+LLM efficiently",
          "trade-off: retrieval speed vs generative reasoning depth"
        ],
        "tag": "VLM architecture comparison"
      }
    ]
  },
  "reinforcement-learning": {
    "mcq": [
      {
        "q": "In a Markov Decision Process, what does the Markov property state?",
        "options": [
          "The future state depends on the entire history of past states and actions",
          "The future state depends only on the current state and action, not on the history that led there",
          "Rewards must always be positive",
          "The policy must be deterministic"
        ],
        "answer": 1,
        "explain": "The Markov property means the current state is a sufficient statistic for predicting the future, so history beyond the current state is not needed.",
        "tag": "Markov Decision Process"
      },
      {
        "q": "What does the Bellman equation express?",
        "options": [
          "The gradient of the loss function with respect to network weights",
          "The value of a state (or state-action pair) as the immediate reward plus the discounted value of the successor state/action",
          "The probability of an action given a state under a fixed random policy",
          "The KL divergence between two policies"
        ],
        "answer": 1,
        "explain": "The Bellman equation recursively decomposes a value function into immediate reward plus the discounted expected value of what follows.",
        "tag": "Bellman equation"
      },
      {
        "q": "What is the core trade-off in the exploration-exploitation dilemma?",
        "options": [
          "Choosing between on-policy and off-policy algorithms",
          "Balancing trying new actions to discover potentially better rewards (exploration) against choosing the currently best-known action to maximize immediate reward (exploitation)",
          "Balancing GPU memory versus CPU memory usage",
          "Choosing between discrete and continuous action spaces"
        ],
        "answer": 1,
        "explain": "An agent must balance gathering more information about unknown actions against greedily using its current best estimate to maximize reward now.",
        "tag": "exploration-exploitation"
      },
      {
        "q": "What is a key difference between on-policy and off-policy RL algorithms?",
        "options": [
          "On-policy learns from data generated by the current policy being optimized, while off-policy can learn from data generated by a different (e.g., older or exploratory) policy",
          "On-policy algorithms cannot use neural networks",
          "Off-policy algorithms never use a replay buffer",
          "On-policy and off-policy are functionally identical in practice"
        ],
        "answer": 0,
        "explain": "On-policy methods (e.g., SARSA) require the behavior policy to match the policy being improved, while off-policy methods (e.g., Q-learning) can learn from data collected under any policy.",
        "tag": "on-policy vs off-policy"
      }
    ],
    "short": [
      {
        "q": "Explain the difference between value-based and policy-based RL methods, and why actor-critic combines them.",
        "model": "Value-based methods (e.g., Q-learning) learn an estimate of expected return for states or state-action pairs and derive a policy implicitly (e.g., greedy over Q-values), which works well for discrete actions but struggles with continuous action spaces. Policy-based methods (e.g., REINFORCE) directly parameterize and optimize the policy via gradient ascent on expected return, handling continuous actions naturally but often suffering from high-variance gradient estimates. Actor-critic methods combine both: an actor updates the policy directly while a critic learns a value function to provide a lower-variance baseline/advantage estimate for the actor's updates.",
        "points": [
          "value-based: learn Q/V, derive policy implicitly",
          "policy-based: directly optimize policy, handles continuous actions, high variance",
          "actor-critic: actor updates policy, critic reduces variance via value baseline",
          "trade-off addressed: variance vs action-space flexibility"
        ],
        "tag": "actor-critic"
      }
    ]
  },
  "evaluation-metrics": {
    "mcq": [
      {
        "q": "Precision and recall are defined as…",
        "options": [
          "Precision = TP/(TP+FN), Recall = TP/(TP+FP)",
          "Precision = TP/(TP+FP), Recall = TP/(TP+FN)",
          "Precision = TN/(TN+FP), Recall = TP/(TP+FP)",
          "Both equal TP/(TP+TN)"
        ],
        "answer": 1,
        "tag": "precision vs recall",
        "explain": "Precision is over predicted positives (TP+FP); recall is over actual positives (TP+FN)."
      },
      {
        "q": "ROC-AUC can be interpreted as…",
        "options": [
          "The accuracy at the optimal threshold",
          "The probability a random positive is scored higher than a random negative",
          "The area under the precision-recall curve",
          "1 minus the log-loss"
        ],
        "answer": 1,
        "tag": "AUC meaning",
        "explain": "AUC equals the probability that a randomly chosen positive ranks above a randomly chosen negative — a ranking metric independent of threshold."
      },
      {
        "q": "On a heavily imbalanced dataset (1% positives), which metric is most misleading if used alone?",
        "options": [
          "Precision-Recall AUC",
          "F1 score",
          "Accuracy",
          "Recall"
        ],
        "answer": 2,
        "tag": "imbalance pitfalls",
        "explain": "A trivial 'always negative' classifier scores 99% accuracy, so accuracy hides poor positive-class performance."
      },
      {
        "q": "The F1 score is the…",
        "options": [
          "Arithmetic mean of precision and recall",
          "Harmonic mean of precision and recall",
          "Product of precision and recall",
          "Geometric mean of TPR and FPR"
        ],
        "answer": 1,
        "tag": "F1",
        "explain": "F1 = 2·P·R/(P+R), the harmonic mean, which punishes large imbalance between precision and recall."
      }
    ],
    "short": [
      {
        "q": "When would you prefer PR-AUC over ROC-AUC, and why?",
        "model": "Under heavy class imbalance. ROC-AUC uses FPR, whose denominator (the many negatives) makes it change little as false positives grow, so ROC can look optimistic. PR-AUC focuses on the positive class (precision vs recall) and is far more sensitive to false positives when positives are rare.",
        "points": [
          "prefer PR-AUC under class imbalance",
          "ROC's FPR is dominated by the large negative set → over-optimistic",
          "PR curve reflects positive-class precision, sensitive to FPs"
        ],
        "tag": "PR-AUC vs ROC-AUC"
      }
    ]
  },
  "benchmarks": {
    "mcq": [
      {
        "q": "What is 'benchmark contamination'?",
        "options": [
          "Test set examples appearing in the model's pretraining or fine-tuning data, inflating scores",
          "A benchmark with too few examples to be statistically valid",
          "Randomized noise deliberately added to benchmark inputs to test robustness",
          "Using the same benchmark across multiple model versions"
        ],
        "answer": 0,
        "explain": "Contamination means the model has effectively memorized answers because the eval data leaked into training, so the score no longer reflects true generalization.",
        "tag": "data contamination"
      },
      {
        "q": "In code-generation benchmarks like HumanEval, why report pass@k rather than single-shot accuracy?",
        "options": [
          "pass@k is cheaper to compute than accuracy",
          "It estimates the probability that at least one of k sampled completions is correct, matching real usage where users can retry or sample multiple times",
          "It removes the need for unit tests entirely",
          "It only evaluates syntax validity, not correctness"
        ],
        "answer": 1,
        "explain": "pass@k directly models the realistic scenario of generating k candidate solutions and succeeding if any pass the tests, which better reflects how these models are actually used.",
        "tag": "code-gen evaluation"
      },
      {
        "q": "What's a key risk of relying on a single aggregate benchmark score (e.g., an overall MMLU number) to rank LLMs?",
        "options": [
          "It cannot be computed automatically",
          "It requires human graders for every example",
          "A single average masks large per-subject/per-domain weaknesses and can be sensitive to prompt formatting, hiding real behavioral differences",
          "It only applies to vision-language models"
        ],
        "answer": 2,
        "explain": "Aggregating across many subtasks smooths out variance, so two models with the same overall score can have very different strengths, and small formatting changes can shift rankings.",
        "tag": "aggregate score limitations"
      },
      {
        "q": "What does object-hallucination evaluation (e.g., POPE) measure in vision-language models?",
        "options": [
          "The latency of the image encoder",
          "Whether the model can generate novel images from text",
          "Accuracy on multiple-choice math word problems",
          "Whether the model asserts that objects or attributes are present in an image when they actually are not"
        ],
        "answer": 3,
        "explain": "POPE-style probes ask yes/no questions about object presence to quantify how often a VLM confidently describes things that aren't in the image.",
        "tag": "VLM hallucination"
      }
    ],
    "short": [
      {
        "q": "Why do top LLM benchmarks tend to 'saturate' over time, and what's a common mitigation?",
        "model": "As models improve, scores on a fixed benchmark cluster near the ceiling (e.g., 95%+), making it hard to distinguish model quality and increasing sensitivity to contamination or noise. Mitigations include releasing harder held-out benchmarks, dynamically generated or private test sets, and adversarial/human-in-the-loop evaluation that adapts as models improve.",
        "points": [
          "Saturation reduces discriminative power between models",
          "Static public benchmarks are prone to contamination over time",
          "Fresh/held-out or dynamically generated benchmarks restore signal"
        ],
        "tag": "benchmark saturation"
      }
    ]
  },
  "online-testing": {
    "mcq": [
      {
        "q": "What is the primary purpose of a guardrail metric in an online A/B test?",
        "options": [
          "To detect that the treatment isn't causing unacceptable harm (e.g., latency regressions, crashes) even if the primary metric improves",
          "To replace the primary success metric entirely",
          "To increase the statistical power of the test",
          "To determine the required sample size before launch"
        ],
        "answer": 0,
        "explain": "Guardrails protect against shipping a change that wins on the primary metric but silently damages something critical like performance or reliability.",
        "tag": "guardrail metrics"
      },
      {
        "q": "Why is a 'novelty effect' a concern when interpreting early A/B test results?",
        "options": [
          "It permanently biases the experiment's overall evaluation criterion toward control",
          "Users may react to a change simply because it's different or new, so an early lift can fade over time and not reflect steady-state impact",
          "It always inflates the variance of the metric being measured",
          "It only affects offline, not online, evaluation"
        ],
        "answer": 1,
        "explain": "Novelty (or primacy) effects mean short-term reactions to change can overstate or understate the long-run treatment effect, so long-running or holdout tests are used to check durability.",
        "tag": "novelty effect"
      },
      {
        "q": "In an A/B test, what does a Sample Ratio Mismatch (SRM) check detect?",
        "options": [
          "Low statistical power in the experiment",
          "Non-normality of the metric distribution",
          "The observed split between treatment and control deviates significantly from the intended allocation, signaling a broken randomization or instrumentation bug",
          "Seasonality effects in the metric over the test duration"
        ],
        "answer": 2,
        "explain": "SRM is a data-quality check (usually a chi-square test on arm counts); a significant mismatch invalidates the experiment's results regardless of what the metric shows.",
        "tag": "sample ratio mismatch"
      },
      {
        "q": "Why use CUPED (variance reduction via pre-experiment covariates) in A/B testing?",
        "options": [
          "It increases the minimum detectable effect required",
          "It replaces the need for randomization between arms",
          "It corrects for multiple hypothesis testing across metrics",
          "It reduces metric variance by adjusting for a user's pre-period behavior, allowing the same effect to be detected with fewer users or less time"
        ],
        "answer": 3,
        "explain": "CUPED uses a covariate correlated with the outcome (like pre-experiment usage) to strip out predictable variance, shrinking confidence intervals without changing the point estimate.",
        "tag": "variance reduction (CUPED)"
      }
    ],
    "short": [
      {
        "q": "What is 'peeking' in online A/B testing and why does it inflate false-positive rates?",
        "model": "Peeking is repeatedly checking a test's p-value before the pre-planned sample size or duration is reached and stopping as soon as it looks significant. Because each look is another chance for random noise to cross the significance threshold, the true false-positive rate across many peeks is much higher than the nominal alpha. Proper fixes include sequential testing methods (e.g., always-valid p-values) or committing to a fixed sample size/duration determined by a power analysis.",
        "points": [
          "Repeated significance checks multiply the chance of a false positive",
          "Nominal alpha only holds for a single, pre-planned analysis",
          "Sequential testing or fixed-horizon designs correct for this"
        ],
        "tag": "sequential testing / peeking"
      }
    ]
  },
  "drift": {
    "mcq": [
      {
        "q": "What distinguishes concept drift from covariate (data) drift?",
        "options": [
          "Concept drift is a change in the relationship between features and the target, P(y|x), whereas covariate drift is a change in the input feature distribution P(x) with that relationship unchanged",
          "Concept drift only happens in computer vision models",
          "Covariate drift requires labels to detect while concept drift does not",
          "They describe exactly the same phenomenon"
        ],
        "answer": 0,
        "explain": "Covariate drift shifts what inputs look like without changing how they map to labels; concept drift changes the mapping itself, e.g., what used to predict 'fraud' no longer does.",
        "tag": "concept vs covariate drift"
      },
      {
        "q": "Why is detecting concept drift generally harder in production than detecting covariate drift?",
        "options": [
          "Concept drift never actually affects model accuracy",
          "Detecting concept drift typically requires ground-truth labels, which are often delayed or unavailable, while covariate drift can be detected from input features alone",
          "Covariate drift cannot be measured with any statistical test",
          "Concept drift can only occur during model training, not after deployment"
        ],
        "answer": 1,
        "explain": "Covariate drift is unsupervised (just compare feature distributions), but confirming a change in P(y|x) needs labels, which in production often arrive with lag or not at all.",
        "tag": "concept drift detection"
      },
      {
        "q": "What does the Population Stability Index (PSI) measure, and what's a commonly used threshold for a 'significant' shift?",
        "options": [
          "Difference in sample size between two datasets; flagged above roughly 1000 records",
          "Change in model inference latency; flagged above roughly 100ms",
          "The divergence between a feature's binned distribution in a baseline window versus a current window, commonly flagged when PSI exceeds about 0.2",
          "The rate of label noise in the training set; flagged above roughly 5%"
        ],
        "answer": 2,
        "explain": "PSI compares binned proportions between a reference and current distribution; values around 0.1-0.2 suggest moderate shift and above 0.2 is commonly treated as significant.",
        "tag": "PSI drift metric"
      },
      {
        "q": "A model's production accuracy silently degrades over several months even though no code or infrastructure changed. Which explanation is most consistent with drift?",
        "options": [
          "The training dataset was accidentally duplicated",
          "The evaluation metric implementation had a bug",
          "A GPU hardware failure occurred during serving",
          "The real-world input distribution or the feature-target relationship has shifted away from what the model was originally trained on"
        ],
        "answer": 3,
        "explain": "Gradual accuracy decay with stable code/infra is the classic signature of covariate or concept drift, where the world has changed but the model hasn't been retrained to match.",
        "tag": "silent accuracy decay"
      }
    ],
    "short": [
      {
        "q": "How should a team decide when to retrain a model in response to detected drift, rather than retraining on a fixed schedule?",
        "model": "Fixed-schedule retraining can be wasteful (retraining when nothing changed) or too slow (missing a sudden shift). A better approach monitors drift metrics (e.g., PSI on key features, prediction distribution, or realized accuracy once labels arrive) and triggers retraining when a metric crosses a defined threshold, combined with periodic scheduled retrains as a safety net. This ties retraining cost to actual need while still catching drift that monitoring might miss.",
        "points": [
          "Fixed cadence alone is a blunt instrument versus real-time monitoring",
          "Threshold-based triggers on drift/accuracy metrics target retraining to actual need",
          "Combine monitoring triggers with a scheduled fallback for robustness"
        ],
        "tag": "drift detection & retraining"
      }
    ]
  },
  "mlops-tooling": {
    "mcq": [
      {
        "q": "What problem does a feature store primarily solve in ML systems?",
        "options": [
          "Ensuring training and serving pipelines compute features consistently, avoiding train/serve skew, while enabling feature reuse across models",
          "Storing raw video and image blobs for later labeling",
          "Replacing the need for a model registry",
          "Automatically generating labels for unlabeled training data"
        ],
        "answer": 0,
        "explain": "Feature stores centralize feature definitions and computation so the exact same logic used offline for training is used online for serving, preventing subtle skew bugs.",
        "tag": "feature store"
      },
      {
        "q": "What is the main purpose of a model registry in an MLOps pipeline?",
        "options": [
          "To generate synthetic training data automatically",
          "To version, catalog, and track the lifecycle stage (e.g., staging, production, archived) of trained model artifacts along with metadata for reproducibility and rollback",
          "To tune hyperparameters automatically during training",
          "To orchestrate GPU cluster scheduling for training jobs"
        ],
        "answer": 1,
        "explain": "A registry gives a single source of truth for which model artifact is deployed where, with lineage back to the training run, enabling safe promotion and rollback.",
        "tag": "model registry"
      },
      {
        "q": "Why do MLOps pipelines emphasize experiment tracking tools (e.g., MLflow, Weights & Biases)?",
        "options": [
          "They replace the need for unit testing code",
          "They reduce model inference latency directly",
          "They record hyperparameters, code version, metrics, and artifacts per run so experiments are reproducible and comparable",
          "They automatically deploy the best model to production"
        ],
        "answer": 2,
        "explain": "Experiment tracking captures the full context of a run so results can be reproduced, compared across configurations, and audited later.",
        "tag": "experiment tracking"
      },
      {
        "q": "What is a key difference between CI/CD in an MLOps context versus traditional software CI/CD?",
        "options": [
          "MLOps CI/CD is identical to traditional software CI/CD with no meaningful differences",
          "MLOps has no need for continuous delivery since models are never redeployed",
          "CI in MLOps only ever tests code and never touches data",
          "ML CI/CD pipelines must also validate data schemas/quality and can trigger retraining or redeployment on data or model drift, not just code changes"
        ],
        "answer": 3,
        "explain": "Because model behavior depends on data as well as code, ML pipelines add data validation gates and drift/monitoring-driven triggers that traditional software CI/CD doesn't need.",
        "tag": "ML CI/CD"
      }
    ],
    "short": [
      {
        "q": "What role does a workflow orchestrator (e.g., Airflow, Kubeflow Pipelines) play in an MLOps stack, and why not just use ad hoc cron jobs?",
        "model": "Orchestrators define ML workflows (data ingestion, feature computation, training, evaluation, deployment) as DAGs of tasks with explicit dependencies, retries, scheduling, and observability. This gives reproducible, versioned pipelines with clear lineage and failure handling, whereas ad hoc cron jobs lack dependency awareness, retry logic, and visibility, making failures silent and pipelines hard to reason about or reproduce.",
        "points": [
          "Orchestrators express pipeline steps as a DAG with explicit dependencies",
          "Built-in retries, scheduling, and monitoring beat ad hoc cron scripts",
          "Improves reproducibility and lineage across the ML pipeline"
        ],
        "tag": "pipeline orchestration"
      }
    ]
  },
  "model-debugging": {
    "mcq": [
      {
        "q": "Training loss becomes NaN after a few hundred steps. What is the most likely root cause to investigate first?",
        "options": [
          "Learning rate too high, or numerical instability in mixed-precision training, causing exploding gradients",
          "Too few training epochs were configured",
          "The test set is too small to be representative",
          "The optimizer is Adam instead of plain SGD"
        ],
        "answer": 0,
        "explain": "NaNs after initial stable steps are the classic signature of exploding gradients or fp16 overflow, most often traced to too-high a learning rate or missing loss scaling.",
        "tag": "exploding gradients / NaN loss"
      },
      {
        "q": "Training loss decreases steadily while validation loss decreases then starts increasing, even as training loss keeps falling. What does this indicate?",
        "options": [
          "Vanishing gradients in the early layers",
          "Overfitting — the model is increasingly memorizing training data rather than generalizing",
          "The learning rate is set too low",
          "A bug in the data loader's shuffling logic"
        ],
        "answer": 1,
        "explain": "A growing gap where train loss keeps improving but validation loss worsens is the textbook overfitting curve, calling for regularization, more data, or early stopping.",
        "tag": "overfitting diagnosis"
      },
      {
        "q": "A model trains to near-zero loss on a tiny toy subset of the data but fails to learn well on the full dataset. What does the 'overfit a single batch' debugging step actually verify?",
        "options": [
          "That the held-out test set is class-balanced",
          "That inference latency is within budget",
          "That the model, loss function, and optimizer plumbing are correct and have enough capacity, isolating bugs from data-scale or optimization issues",
          "That the model generalizes well to unseen data"
        ],
        "answer": 2,
        "explain": "If the model can't drive loss to near zero on a handful of examples, the bug is in the modeling/training code itself, not in generalization, narrowing the search space.",
        "tag": "sanity-check debugging"
      },
      {
        "q": "Gradients in the earliest layers of a very deep network stay near-zero throughout training while later layers update normally. What is this most consistent with?",
        "options": [
          "Label leakage from the target into the features",
          "Data drift between training and evaluation sets",
          "Overfitting to the training set",
          "Vanishing gradients, often caused by saturating activations or poor initialization/normalization compounding across many layers"
        ],
        "answer": 3,
        "explain": "Gradients shrinking as they backpropagate through many layers (especially with saturating nonlinearities or bad init) is the classic vanishing gradient pattern, addressed via residual connections, normalization, or better init.",
        "tag": "vanishing gradients"
      }
    ],
    "short": [
      {
        "q": "Describe a systematic first-pass checklist for debugging a model that isn't learning at all (loss flat from step one).",
        "model": "Start by verifying the data pipeline (labels aligned with inputs, no accidental shuffling mismatch, sane value ranges), then overfit a tiny batch to confirm the model/loss/optimizer can drive loss down at all. Check the learning rate isn't absurdly low or high, gradients are actually flowing (not zeroed by a bug or wrong loss reduction), and that the loss function matches the task. Only after these plumbing checks pass should you suspect deeper issues like architecture capacity or data quality at scale.",
        "points": [
          "Verify data/label pipeline correctness first",
          "Overfit a small batch to isolate plumbing bugs from scale/data issues",
          "Check learning rate and that gradients are actually flowing"
        ],
        "tag": "loss curve diagnosis"
      }
    ]
  },
  "distributed-training-parallelism": {
    "mcq": [
      {
        "q": "What is the fundamental difference between data parallelism and model (tensor) parallelism?",
        "options": [
          "Data parallelism replicates the full model on each device and splits the batch across devices; model parallelism splits the model's own parameters/layers across devices for a shared batch",
          "Data parallelism only works on CPUs, never GPUs",
          "Model parallelism requires no communication between devices at all",
          "They are simply two names for the exact same technique"
        ],
        "answer": 0,
        "explain": "Data parallelism scales by duplicating the whole model and dividing the data; model parallelism scales by dividing the model itself when it's too large to fit on one device.",
        "tag": "data vs model parallelism"
      },
      {
        "q": "What problem does pipeline parallelism introduce that micro-batching is used to mitigate?",
        "options": [
          "Increased final model accuracy loss",
          "'Pipeline bubbles' — idle time on devices waiting for activations or gradients from adjacent stages, reducing hardware utilization",
          "A reduced need for gradient synchronization across devices",
          "Loss of numerical precision in gradients"
        ],
        "answer": 1,
        "explain": "Splitting a model into sequential stages across devices creates idle 'bubble' time at the start/end of each pass; feeding smaller micro-batches through the pipeline keeps more devices busy concurrently.",
        "tag": "pipeline parallelism bubbles"
      },
      {
        "q": "In data-parallel training across multiple GPUs, what collective operation combines gradients across replicas before the optimizer step?",
        "options": [
          "Broadcast",
          "Gather",
          "All-reduce, which sums or averages gradients across all workers and distributes the combined result back to each",
          "Scatter"
        ],
        "answer": 2,
        "explain": "All-reduce combines gradients from every replica and ensures each worker ends up with the identical averaged gradient, keeping model replicas in sync.",
        "tag": "all-reduce gradient sync"
      },
      {
        "q": "ZeRO (Zero Redundancy Optimizer) improves on standard data parallelism primarily by:",
        "options": [
          "Removing all cross-device communication",
          "Automatically increasing the batch size during training",
          "Performing all computation on CPU memory instead of GPU memory",
          "Sharding optimizer states, gradients, and/or parameters across data-parallel workers instead of fully replicating them, drastically cutting per-GPU memory use"
        ],
        "answer": 3,
        "explain": "ZeRO removes the memory redundancy of standard data parallelism by partitioning optimizer state/gradients/parameters across GPUs, enabling much larger models to be trained with the same hardware.",
        "tag": "ZeRO memory sharding"
      }
    ],
    "short": [
      {
        "q": "Why do large-scale LLM training runs often combine data, tensor, and pipeline parallelism ('3D parallelism') instead of using just one?",
        "model": "No single strategy scales well alone at extreme sizes: pure data parallelism hits per-GPU memory limits since the whole model must fit on each device, pure tensor parallelism incurs heavy communication within a layer, and pure pipeline parallelism suffers from bubbles at high stage counts. Combining them lets tensor parallelism handle within-node splitting of large layers, pipeline parallelism split the model across nodes, and data parallelism scale throughput across many replicas, balancing memory, communication, and utilization trade-offs.",
        "points": [
          "Each parallelism form has a distinct bottleneck (memory, communication, bubbles)",
          "Combining forms balances these trade-offs at extreme scale",
          "Typically tensor parallel within a node, pipeline across nodes, data parallel across replica groups"
        ],
        "tag": "3D parallelism"
      }
    ]
  },
  "grad-accum-checkpoint": {
    "mcq": [
      {
        "q": "What problem does gradient accumulation solve?",
        "options": [
          "It lets you simulate a larger effective batch size than fits in GPU memory by summing gradients over several micro-batches before taking one optimizer step",
          "It reduces the total number of training epochs required to converge",
          "It eliminates the need for a learning rate schedule",
          "It compresses the trained model for faster deployment"
        ],
        "answer": 0,
        "explain": "By accumulating gradients across several forward/backward passes before updating weights, you get the statistical effect of a large batch without needing it to fit in memory at once.",
        "tag": "gradient accumulation"
      },
      {
        "q": "What is the core trade-off made by activation (gradient) checkpointing?",
        "options": [
          "It reduces model accuracy in exchange for training speed",
          "It trades extra compute (recomputing activations during the backward pass) for reduced memory usage, since fewer activations need to be stored during the forward pass",
          "It trades disk space for network bandwidth during distributed training",
          "It removes the backward pass from training entirely"
        ],
        "answer": 1,
        "explain": "Checkpointing only stores a subset of activations and recomputes the rest on demand during backprop, cutting peak memory at the cost of roughly one extra forward pass.",
        "tag": "activation checkpointing"
      },
      {
        "q": "When accumulating gradients over N micro-batches, what must typically be done so training matches using one large batch directly?",
        "options": [
          "Multiply the loss by N before calling backward",
          "Skip the optimizer step for the first N-1 micro-batches only conceptually, with no scaling needed",
          "Divide the loss (or the accumulated gradients) by N so the effective gradient matches the average over the full large batch",
          "Apply gradient clipping twice, once per micro-batch and once after accumulation"
        ],
        "answer": 2,
        "explain": "Since gradients from a mean-reduced loss add up across micro-batches, dividing by N before the optimizer step keeps the effective gradient equivalent to computing it on the full combined batch.",
        "tag": "gradient accumulation scaling"
      },
      {
        "q": "Why can naive gradient accumulation interact badly with batch normalization?",
        "options": [
          "BatchNorm requires activation checkpointing to function at all",
          "BatchNorm layers don't use gradients in any way",
          "BatchNorm cannot be combined with any form of parallelism",
          "BatchNorm statistics are computed per micro-batch, so normalization effectively sees a smaller batch than the accumulated gradient step implies, unlike layer norm which is unaffected"
        ],
        "answer": 3,
        "explain": "BatchNorm's running mean/variance are computed on whichever micro-batch is currently in memory, not the full accumulated batch, so its effective batch statistics don't scale with accumulation the way the optimizer's gradient does.",
        "tag": "gradient accumulation + batchnorm"
      }
    ],
    "short": [
      {
        "q": "When training a large model that barely fits in GPU memory, how do gradient accumulation and activation checkpointing complement each other, and what's the downside of combining them?",
        "model": "Activation checkpointing frees up memory by not storing all intermediate activations, which lets you fit a larger micro-batch or model on the GPU; gradient accumulation then lets you further scale up the effective batch size across multiple micro-batch steps without needing more memory. The downside is added wall-clock time: checkpointing requires recomputing activations during backward, and accumulation means more sequential forward/backward passes per optimizer step, so throughput trades against memory savings.",
        "points": [
          "Checkpointing frees memory per micro-batch; accumulation scales effective batch size across steps",
          "Both increase compute time/step count to save memory",
          "Combining them enables training configurations that wouldn't otherwise fit on the hardware"
        ],
        "tag": "activation checkpointing trade-off"
      }
    ]
  },
  "model-compression": {
    "mcq": [
      {
        "q": "What is the main idea behind knowledge distillation?",
        "options": [
          "A smaller 'student' model is trained to mimic the output distribution (soft labels) of a larger 'teacher' model, transferring learned behavior into a more efficient model",
          "Removing layers from a model at random until it gets small enough",
          "Converting all model weights from float32 to int8",
          "Pruning neurons with the smallest-magnitude weights"
        ],
        "answer": 0,
        "explain": "Distillation trains a compact student to match a larger teacher's soft predictions (and sometimes intermediate representations), often recovering more accuracy than training the small model from scratch.",
        "tag": "knowledge distillation"
      },
      {
        "q": "What is the difference between structured and unstructured pruning?",
        "options": [
          "Structured pruning can only ever be applied to convolutional networks",
          "Structured pruning removes whole structural units (channels, attention heads, layers), yielding real speedups on standard hardware; unstructured pruning zeroes individual weights, which needs specialized sparse kernels to realize any speedup",
          "Unstructured pruning always improves accuracy over the dense model",
          "Structured and unstructured pruning are functionally identical in practice"
        ],
        "answer": 1,
        "explain": "Because standard GPUs/CPUs are optimized for dense matrix ops, unstructured sparsity (individual zeroed weights) often doesn't translate into wall-clock speedup without special sparse kernels, while structured pruning removes entire units, shrinking the dense computation directly.",
        "tag": "structured vs unstructured pruning"
      },
      {
        "q": "Why does post-training quantization to int8 usually cause much less accuracy loss than naive quantization to int4 or lower?",
        "options": [
          "int8 actually uses more storage per weight than int4",
          "int4 quantization doesn't reduce model size at all",
          "Lower bit-widths represent a much coarser range of values per weight, increasing quantization error unless mitigated by techniques like per-channel scaling, calibration, or quantization-aware training",
          "int8 quantization always requires full retraining while int4 never does"
        ],
        "answer": 2,
        "explain": "Fewer bits means fewer representable levels for each weight, so rounding error grows; aggressive low-bit quantization typically needs extra care (calibration, QAT, mixed precision) to stay accurate.",
        "tag": "quantization bit-width"
      },
      {
        "q": "What is quantization-aware training (QAT), and why is it often preferred over pure post-training quantization for aggressive compression?",
        "options": [
          "It quantizes only the activations and never touches the weights",
          "It is applied only after a model has already been deployed to production",
          "It requires no labeled data whatsoever",
          "It simulates quantization effects (rounding) during training or fine-tuning so the model's weights adapt to reduced precision, recovering accuracy that post-hoc quantization would otherwise lose"
        ],
        "answer": 3,
        "explain": "QAT inserts fake-quantization ops during training so gradients account for rounding error, letting the model learn weights that are robust to low precision, unlike post-training quantization which quantizes an already-converged model.",
        "tag": "quantization-aware training"
      }
    ],
    "short": [
      {
        "q": "You need to deploy a model under a tight latency budget on limited hardware. How would you decide between quantization, pruning, and distillation (or some combination)?",
        "model": "The right choice depends on the bottleneck and constraints: quantization is usually the cheapest win (often near-lossless at int8) when hardware supports low-precision kernels, and is a good first step. Structured pruning helps when compute FLOPs are the bottleneck and you can retrain to recover accuracy. Distillation is best when you need a fundamentally smaller architecture (not just fewer bits or fewer weights) and can afford a separate training run with a teacher model. In practice these are often combined, e.g., distill to a smaller architecture and then quantize it further.",
        "points": [
          "Quantization is typically the lowest-effort, often near-lossless first step",
          "Structured pruning targets FLOPs/compute when retraining is feasible",
          "Distillation changes the architecture itself and can be combined with the other two"
        ],
        "tag": "quantization vs pruning vs distillation"
      }
    ]
  },
  "model-acceleration": {
    "mcq": [
      {
        "q": "What does operator/kernel fusion do to accelerate inference?",
        "options": [
          "Combines multiple sequential operations (e.g., matmul + bias + activation) into a single fused GPU kernel, cutting memory reads/writes between ops and reducing kernel-launch overhead",
          "Increases the total number of model parameters",
          "Splits one operation into many smaller kernels to increase parallelism",
          "Only applies during training, never during inference"
        ],
        "answer": 0,
        "explain": "Fusing ops avoids writing intermediate results back to memory and re-reading them for the next op, and avoids the overhead of launching many separate kernels, both of which speed up inference.",
        "tag": "kernel fusion"
      },
      {
        "q": "In autoregressive LLM inference, what is the purpose of a KV cache?",
        "options": [
          "It caches the tokenizer's vocabulary for faster lookup",
          "It stores previously computed key/value attention tensors so each new token only requires one incremental forward pass instead of recomputing attention over the entire sequence",
          "It stores gradients between training epochs for faster convergence",
          "It compresses the model's weights on disk for smaller storage"
        ],
        "answer": 1,
        "explain": "Without a KV cache, generating each new token would require recomputing keys/values for all prior tokens; caching them makes decoding cost roughly linear instead of quadratic in sequence length per new token.",
        "tag": "KV cache"
      },
      {
        "q": "Why is LLM autoregressive decoding (batch size 1) typically memory-bandwidth-bound rather than compute-bound?",
        "options": [
          "The GPU has no compute units available during decoding",
          "Decoding involves no matrix multiplications at all",
          "Each decoding step must move the full model's weights from memory to compute units to process just one new token, so the small amount of compute per token can't keep pace with the time spent loading weights",
          "Memory bandwidth has no effect on inference speed"
        ],
        "answer": 2,
        "explain": "With batch size 1, the arithmetic intensity (compute per byte loaded) is very low since only one token's worth of activations is computed per full weight load, so time is dominated by moving weights from HBM, not by FLOPs.",
        "tag": "memory-bound decoding"
      },
      {
        "q": "What is the core idea behind speculative decoding for speeding up LLM inference?",
        "options": [
          "It removes attention layers from the model entirely",
          "It permanently quantizes the model to lower precision",
          "It only accelerates the prompt/prefill stage, not generation",
          "A small, fast draft model proposes several tokens ahead, and the large target model verifies and accepts them in a single batched pass, reducing the number of expensive sequential large-model steps"
        ],
        "answer": 3,
        "explain": "Speculative decoding exploits the fact that verifying multiple draft tokens in parallel is cheap relative to generating them one at a time with the large model, giving a lossless speedup when the draft model agrees often enough.",
        "tag": "speculative decoding"
      }
    ],
    "short": [
      {
        "q": "Explain the difference between the prefill and decode phases of LLM inference and why they have different performance characteristics.",
        "model": "Prefill processes the entire input prompt in one parallel forward pass, computing attention over all prompt tokens at once, which is compute-bound and benefits from large batch/matrix operations. Decode then generates tokens one at a time autoregressively, where each step only computes for a single new token against the cached KV history, making it memory-bandwidth-bound since weight loading dominates over the tiny amount of per-token compute. This split motivates techniques like continuous batching and KV caching that separately optimize each phase.",
        "points": [
          "Prefill computes the whole prompt in parallel and is compute-bound",
          "Decode generates one token at a time and is memory-bandwidth-bound",
          "Different bottlenecks motivate different optimizations (batching for prefill, KV cache for decode)"
        ],
        "tag": "KV cache & memory-bound decoding"
      }
    ]
  },
  "gpu-architecture": {
    "mcq": [
      {
        "q": "In NVIDIA GPU terminology, what is a Streaming Multiprocessor (SM)?",
        "options": [
          "The core parallel-processing unit of the GPU, containing CUDA cores/tensor cores, register files, and shared memory, with many SMs running concurrently across the chip",
          "The GPU's main system RAM shared with the CPU",
          "The PCIe interface controller connecting the GPU to the motherboard",
          "A single scalar arithmetic instruction executed by one thread"
        ],
        "answer": 0,
        "explain": "SMs are the fundamental building block of a GPU's compute capability; a GPU consists of many SMs, each capable of executing many threads/warps in parallel.",
        "tag": "streaming multiprocessor"
      },
      {
        "q": "What are Tensor Cores specifically designed to accelerate?",
        "options": [
          "General-purpose scalar integer arithmetic",
          "Mixed-precision matrix multiply-accumulate operations (e.g., FP16/BF16 inputs accumulated in FP32), which dominate deep learning workloads",
          "Video encoding and decoding pipelines",
          "PCIe data transfer between host and device"
        ],
        "answer": 1,
        "explain": "Tensor Cores are specialized hardware units that perform fused matrix-multiply-add at much higher throughput than general CUDA cores, specifically targeting the matmul-heavy workloads of neural networks.",
        "tag": "tensor cores"
      },
      {
        "q": "Why does GPU shared memory (on-chip, per-SM) matter for kernel performance despite being tiny compared to global HBM memory?",
        "options": [
          "Shared memory increases the model's total parameter count",
          "Shared memory replaces the need for registers entirely",
          "Shared memory has far lower latency and much higher bandwidth than global memory, so kernels that tile data into it (e.g., for matrix multiplication) avoid repeated slow round-trips to HBM",
          "Shared memory is only usable during training, not during inference"
        ],
        "answer": 2,
        "explain": "By staging frequently reused data in fast on-chip shared memory, kernels like tiled matmul or FlashAttention drastically cut the number of slow global-memory accesses, which is often the real performance bottleneck.",
        "tag": "GPU memory hierarchy"
      },
      {
        "q": "What is 'occupancy' in GPU programming, and why can maximizing it improve throughput?",
        "options": [
          "The percentage of the GPU die area dedicated to tensor cores",
          "The clock speed at which the GPU is currently running",
          "The amount of HBM memory physically installed on the device",
          "The ratio of active warps to the maximum number of warps an SM can support; higher occupancy gives the scheduler more warps to hide memory-access latency behind, improving utilization"
        ],
        "answer": 3,
        "explain": "When one warp stalls waiting on a memory access, the SM can switch to executing another resident warp; higher occupancy means more warps are available to fill those stalls, keeping compute units busier.",
        "tag": "GPU occupancy"
      }
    ],
    "short": [
      {
        "q": "Why does the memory hierarchy (HBM vs. on-chip SRAM/shared memory) matter so much for a kernel like FlashAttention?",
        "model": "Standard attention implementations repeatedly write and read large intermediate matrices (like the full attention score matrix) to and from slow global HBM memory, which becomes the bottleneck since HBM bandwidth is far lower than on-chip SRAM bandwidth. FlashAttention restructures the computation to tile the operation so intermediate results stay in fast on-chip SRAM/shared memory as much as possible, only writing final results back to HBM, which reduces memory traffic and speeds up attention without changing the mathematical result.",
        "points": [
          "HBM is high-capacity but comparatively low-bandwidth/high-latency versus on-chip SRAM",
          "Naive attention is bottlenecked by repeated HBM reads/writes of large intermediate matrices",
          "FlashAttention tiles computation to keep data in fast on-chip memory, reducing HBM traffic"
        ],
        "tag": "GPU memory hierarchy"
      }
    ]
  },
  "cs-airbnb-ebr-search": {
    "mcq": [
      {
        "q": "In Airbnb's two-tower EBR system, how are the listing embeddings and query embeddings computed at serving time?",
        "options": [
          "Both towers are computed in real-time per request",
          "Listing embeddings are precomputed offline (daily), while query embeddings are computed in real-time per search",
          "Query embeddings are precomputed daily, while listing embeddings are computed in real-time",
          "Both towers are precomputed offline and looked up from a cache"
        ],
        "answer": 1,
        "tag": "two-tower serving asymmetry",
        "explain": "The listing tower processes home features offline daily to cut online latency, while the query tower encodes search context (location, guests, stay length) in real-time."
      },
      {
        "q": "Why did Airbnb avoid randomly sampling negative examples when training the retrieval model?",
        "options": [
          "Random negatives were too expensive to compute at scale",
          "Random negatives made the learning problem too easy and produced poor model performance",
          "Random sampling introduced positional bias into the labels",
          "Random negatives violated privacy constraints on user trip data"
        ],
        "answer": 1,
        "tag": "negative sampling",
        "explain": "The team found random negatives made the task too easy, so they used harder negatives drawn from homes users actually saw or wishlisted but did not book."
      },
      {
        "q": "Which ANN indexing approach did Airbnb choose for serving, and why?",
        "options": [
          "HNSW, because it gave the lowest query latency regardless of memory cost",
          "IVF (Inverted File Index), because it only needed cluster centroids/assignments and integrated better with existing search infrastructure",
          "Brute-force exact search, because the listing corpus was small enough",
          "Product quantization, because it minimized embedding storage size"
        ],
        "answer": 1,
        "tag": "ANN indexing",
        "explain": "Airbnb chose IVF over HNSW because storing only centroids and cluster assignments fit their existing infrastructure and offered better practical tradeoffs."
      },
      {
        "q": "Airbnb reported that switching from dot product to Euclidean distance as the similarity function was important primarily because it:",
        "options": [
          "Increased raw recall on offline evaluation sets",
          "Produced much more balanced cluster sizes, which IVF retrieval is highly sensitive to",
          "Reduced the embedding dimensionality needed",
          "Eliminated the need for negative sampling"
        ],
        "answer": 1,
        "tag": "similarity function and cluster balance",
        "explain": "Euclidean distance yielded more uniform cluster sizes, and IVF retrieval quality is highly sensitive to cluster-size uniformity."
      }
    ],
    "short": [
      {
        "q": "Describe how Airbnb constructed positive and negative training pairs for its embedding-based retrieval model, and explain why the negative sampling choice mattered.",
        "model": "Airbnb used contrastive learning over user trip data: booked listings were treated as positives, and negatives came from homes the user encountered in search results or wishlisted but did not book. Queries were grouped by trip parameters (location, guest count, stay length) to capture the multi-stage search journey. Using these 'examined-but-not-booked' negatives instead of random homes made the task realistically hard, because random negatives made the problem too easy and degraded model quality.",
        "points": [
          "Positives are booked listings; negatives are seen/wishlisted-but-not-booked homes",
          "Contrastive learning grouped by trip parameters to capture the search journey",
          "Random negatives were too easy and hurt performance, motivating harder negatives"
        ],
        "tag": "label construction and negative sampling"
      }
    ]
  },
  "cs-pinterest-ebr-homefeed": {
    "mcq": [
      {
        "q": "How does Pinterest split computation between the two towers in its Homefeed EBR system?",
        "options": [
          "Both towers are fetched per request to keep embeddings fresh",
          "The Pin tower runs offline while the user tower is fetched once per Homefeed request",
          "The user tower is precomputed offline while the Pin tower runs per request",
          "Both towers are precomputed offline and never recomputed online"
        ],
        "answer": 1,
        "tag": "two-tower serving asymmetry",
        "explain": "Pinterest computes Pin embeddings offline and fetches the user embedding once per Homefeed request, an asymmetry that lets each tower use sophisticated structure."
      },
      {
        "q": "Which feature-crossing techniques did Pinterest apply inside the towers to model feature interactions?",
        "options": [
          "Only a single wide-and-deep linear cross layer",
          "MaskNet (Hadamard products with MLP projections) and later a DHEN framework ensembling multiple crossing layers",
          "Factorization machines followed by gradient-boosted trees",
          "Pure transformer self-attention with no MLP components"
        ],
        "answer": 1,
        "tag": "feature crossing",
        "explain": "Pinterest used MaskNet (Hadamard products refined by MLPs, in parallel blocks) and then a DHEN framework combining MLPs, parallel MaskNet, and transformer encoders."
      },
      {
        "q": "To capture diverse user intents, Pinterest replaced a single user embedding with multiple embeddings using what mechanism?",
        "options": [
          "Multi-head attention over the user history",
          "A differentiable clustering module modified from Capsule Networks with maxmin initialization",
          "K-means clustering computed offline on user actions",
          "A mixture-of-experts gating network"
        ],
        "answer": 1,
        "tag": "multi-embedding retrieval",
        "explain": "Pinterest used a differentiable clustering module adapted from Capsule Networks (with maxmin init and single-assignment routing), serving top-K cluster embeddings combined round-robin."
      },
      {
        "q": "When Pinterest reused large pre-trained user/Pin ID embeddings in the retrieval model, what practice worked best online?",
        "options": [
          "Directly fine-tuning the pre-trained embeddings end-to-end",
          "Freezing the embeddings and applying aggressive dropout (0.5), plus avoiding temporal overlap with the pre-training window",
          "Discarding ID embeddings entirely in favor of MLP-only features",
          "Increasing the embedding dimension to reduce overfitting"
        ],
        "answer": 1,
        "tag": "ID embeddings and overfitting",
        "explain": "Direct fine-tuning caused severe overfitting; frozen embeddings with 0.5 dropout and no temporal overlap with the contrastive pre-training window performed better online."
      }
    ],
    "short": [
      {
        "q": "Explain Pinterest's 'conditional retrieval' for the interest feed: what problem it solves, how the condition is fed into the model, and how it is served.",
        "model": "Conditional retrieval is a two-tower model that accepts a conditional input (the user's followed and inferred interests) to boost personalization among matched candidates. It uses an early-fusion paradigm where the conditional interest input enters the model at the same layer as all other features. At serving time, ANN search is equipped with interest filters so retrieved candidates stay highly relevant to the query interest, which improved relevance even for long-tail interests and made the recommendation funnel more efficient.",
        "points": [
          "Two-tower model conditioned on followed/inferred user interests",
          "Early-fusion: conditional input enters at the same layer as other features",
          "ANN search uses interest filters to guarantee query-interest relevance, helping long-tail interests"
        ],
        "tag": "conditional retrieval"
      }
    ]
  },
  "cs-snap-two-tower-spotlight": {
    "mcq": [
      {
        "q": "What negative sampling strategy does Snap use to train its Spotlight two-tower model?",
        "options": [
          "Offline hard-negative mining from previously shown stories",
          "In-batch negative sampling, using other users' stories in the same batch as negatives",
          "Uniform random sampling from the full story corpus",
          "Popularity-weighted negative sampling"
        ],
        "answer": 1,
        "tag": "negative sampling",
        "explain": "Snap uses in-batch negatives (other users' stories in the same batch), letting the model learn from more user-story combinations and converge faster."
      },
      {
        "q": "In Snap's model, how is the similarity between user and story embeddings computed, and what makes the loss 'hardness-aware'?",
        "options": [
          "Euclidean distance with a fixed margin loss",
          "A temperature-scaled dot product (cosine similarity then sigmoid) trained with binary cross entropy",
          "Learned bilinear interaction with a softmax over all documents",
          "Concatenation of towers fed to a deep MLP scorer"
        ],
        "answer": 1,
        "tag": "loss and similarity",
        "explain": "The towers are combined via a temperature-scaled dot product; cosine similarity then sigmoid with binary cross entropy, where temperature scaling weights hard negatives."
      },
      {
        "q": "Which ANN index does Snap use for Spotlight story retrieval, and where is it stored/served from?",
        "options": [
          "IVF index stored in Redis and loaded per shard",
          "HNSW index built from story embeddings, stored in Google Cloud Storage and loaded by the retrieval service",
          "Product-quantized flat index served from the user profile service",
          "Brute-force cosine search over all documents at request time"
        ],
        "answer": 1,
        "tag": "ANN indexing and serving",
        "explain": "Snap builds an HNSW index from story embeddings, stores it in GCS, and loads it into a sharded retrieval service handling millions of documents."
      },
      {
        "q": "How does Snap handle embedding freshness for users versus stories?",
        "options": [
          "Both are recomputed on every request",
          "User embeddings update every few hours while story embeddings are refreshed much more frequently",
          "Story embeddings are static once trained; only user embeddings update",
          "User embeddings update in real-time while story embeddings update daily"
        ],
        "answer": 1,
        "tag": "embedding freshness",
        "explain": "User embeddings are refreshed every few hours, while story embeddings are updated much more frequently to keep the corpus fresh."
      }
    ],
    "short": [
      {
        "q": "Describe the feature composition of Snap's user tower and story tower in Spotlight, and how the towers produce their final embeddings.",
        "model": "The user tower combines dense features (demographics, engagement statistics) with sparse features (sequences from past engagement, average-pooled), fusing signals like boosts, long views, and favorites into one classification head. The story tower uses story metadata, creator features, and content embeddings from the content-understanding team, kept independent from the user tower. Each tower uses a representation layer of MLP plus 4-layer deep cross networks (ResNet-style, combining sparse and dense features) producing 128-dimensional embeddings that are L2-normalized before the dot-product output.",
        "points": [
          "User tower: dense demographic/engagement + average-pooled sparse engagement sequences, multiple actions into one head",
          "Story tower: metadata, creator features, and content-understanding embeddings, independent of the user tower",
          "MLP + 4-layer deep cross networks produce L2-normalized 128-dim embeddings"
        ],
        "tag": "tower feature composition"
      }
    ]
  },
  "cs-expedia-two-tower-candgen": {
    "mcq": [
      {
        "q": "In Expedia's two-tower system, what is the role of the candidate generation stage relative to ranking?",
        "options": [
          "It reduces a corpus of 10M+ properties down to the N most relevant items so that reranking is tractable",
          "It computes the final booking probability used to sort results shown to the traveler",
          "It replaces the ranking model entirely with a single dot-product score",
          "It filters out fraudulent or duplicate property listings before indexing"
        ],
        "answer": 0,
        "tag": "candidate generation vs ranking",
        "explain": "Candidate generation narrows the huge item corpus (10M+ properties) to N candidates, making the downstream reranking stage computationally feasible."
      },
      {
        "q": "How does Expedia handle negatives when training the two-tower model on a corpus of ~20M items?",
        "options": [
          "In-batch sampled softmax, where other examples in the minibatch act as negatives",
          "Explicit hard-negative mining from a separate offline candidate pool",
          "Random uniform sampling of one negative item per positive from the full corpus",
          "Treating all non-clicked properties shown in the same search session as negatives"
        ],
        "answer": 0,
        "tag": "negative sampling",
        "explain": "In-batch sampled softmax uses the other minibatch examples as negatives, shrinking the label matrix from (batch_size, 20M) to (batch_size, batch_size) and making training practical."
      },
      {
        "q": "Which correction did the authors find essential to counteract bias toward popular items in the in-batch sampled softmax?",
        "options": [
          "logQ correction",
          "Inverse propensity scoring on click labels",
          "Temperature scaling of the dot-product logits",
          "Dropout regularization on the item tower"
        ],
        "answer": 0,
        "tag": "logQ correction",
        "explain": "The article states that applying the logQ correction is essential to mitigate the sampling bias toward popular items, and the BN+log(q)+l2_norm variant was the best performer."
      },
      {
        "q": "What technique does Expedia use to serve retrieval from the trained item embeddings at inference time?",
        "options": [
          "ScaNN approximate nearest neighbor search over indexed item embeddings",
          "A brute-force dot product against all 10M item embeddings per request",
          "An inverted keyword index built from property amenity text",
          "A gradient-boosted tree that reranks a precomputed shortlist"
        ],
        "answer": 0,
        "tag": "ANN serving",
        "explain": "Item embeddings are indexed with ScaNN, and query embeddings are matched against them for fast approximate nearest-neighbor retrieval in real time."
      }
    ],
    "short": [
      {
        "q": "Describe the two-tower architecture Expedia uses and explain the key design constraint that lets item embeddings be precomputed and indexed for ANN retrieval.",
        "model": "Expedia uses two separate MLP towers with ReLU layers: a query tower encoding user context (search query, reference items, historical interactions) and an item tower encoding property features (location, popularity, amenities). Both output fixed-size embeddings that are combined via dot product to score relevance. Because the item tower depends only on property features and not on the query, item embeddings can be computed once offline and indexed (with ScaNN), while only the query embedding is computed at request time and matched against the index.",
        "points": [
          "Query tower encodes user/context; item tower encodes property features; both are MLPs with ReLU",
          "Relevance is a dot product of the two fixed-size embeddings, with output dims matching and optional L2 normalization",
          "Item embeddings are query-independent, so they can be precomputed and indexed in ScaNN for fast ANN retrieval"
        ],
        "tag": "two-tower design"
      }
    ]
  },
  "cs-pinterest-ann-ads": {
    "mcq": [
      {
        "q": "What is the core distinction between Pinterest's offline ANN and online ANN for ad retrieval?",
        "options": [
          "Offline ANN precomputes neighbors for predefined query embeddings and stores <key, neighbors> in a KV store for lookup, while online ANN searches the index in real time per request",
          "Offline ANN uses HNSW while online ANN uses IVF, but both search at request time",
          "Offline ANN runs on GPUs while online ANN runs on CPUs",
          "Offline ANN indexes user embeddings while online ANN indexes ad embeddings"
        ],
        "answer": 0,
        "tag": "offline vs online ANN",
        "explain": "Offline ANN batch-computes neighbors for predetermined query embeddings and stores them as key-value pairs, so serving is a simple lookup instead of a real-time search."
      },
      {
        "q": "Why did Pinterest pursue offline ANN as inventory scaled up?",
        "options": [
          "Maintaining online ANN caused significant infrastructure cost increases as ad inventory grew, despite algorithm improvements",
          "Online ANN produced far lower recall on all query types",
          "Online ANN could not support two-tower embedding models",
          "Regulatory rules prohibited real-time embedding lookups"
        ],
        "answer": 0,
        "tag": "cost/scaling motivation",
        "explain": "The motivation was scaling: online ANN's infra cost rose sharply as inventory expanded, so offline ANN was adopted where large-scale batch processing and cost efficiency matter."
      },
      {
        "q": "Which indexing-algorithm change let Pinterest build a larger tier index covering over 10x more ads?",
        "options": [
          "Migrating from HNSW to the IVF (Inverted File) algorithm",
          "Migrating from IVF to HNSW",
          "Switching from cosine to Euclidean distance",
          "Replacing ANN with exact brute-force search"
        ],
        "answer": 0,
        "tag": "HNSW to IVF",
        "explain": "Pinterest transitioned from HNSW to IVF, which enabled a larger tier index able to encompass more than 10x the number of ads."
      },
      {
        "q": "What is the main freshness limitation of offline ANN, and when is it therefore most appropriate?",
        "options": [
          "It cannot process real-time/dynamic queries, so it fits stable query contexts and slowly-changing user attributes (age, location, privacy settings)",
          "It cannot store more than a few thousand neighbors, so it only fits small inventories",
          "It requires the item tower to be retrained daily, so it fits only static ad creatives",
          "It doubles serving latency, so it fits only offline batch reporting"
        ],
        "answer": 0,
        "tag": "freshness tradeoff",
        "explain": "Precomputed neighbors can't react to real-time queries, so offline ANN suits stable query contexts and static user behavior patterns between batch runs."
      }
    ],
    "short": [
      {
        "q": "Summarize the cost and quality tradeoffs Pinterest reported for offline ANN, including how they mitigate the fixed-neighbor-count limitation.",
        "model": "Offline ANN cut infrastructure cost by up to 80% by replacing repetitive per-query ANN searches with fast KV lookups. In the Visual Embedding candidate-generation case it produced a similar number of candidates as online ANN after hyperparameter tuning while using less than 50% of the infra cost, and it delivered on-par CTR with much higher gCTR30. Because neighbor counts are predetermined offline, they mitigate the loss of flexibility by generating a surplus of neighbors and enlarging index size so enough candidates survive downstream filtering.",
        "points": [
          "Up to 80% infra cost reduction from KV lookups vs real-time searches",
          "Comparable recall/candidate volume and on-par CTR with higher gCTR30 at <50% infra cost in the visual-embedding case",
          "Fixed neighbor counts are mitigated by generating surplus neighbors and enlarging the index"
        ],
        "tag": "cost/quality tradeoffs"
      }
    ]
  },
  "cs-instacart-embeddings-search": {
    "mcq": [
      {
        "q": "What model architecture underlies Instacart's embedding-based search (ITEMS)?",
        "options": [
          "A two-tower bi-encoder built on Sentence Transformers that encodes queries and products into a shared vector space",
          "A single cross-encoder that jointly attends to query and product tokens for every pair",
          "A gradient-boosted tree over TF-IDF features",
          "A graph neural network over the co-purchase graph"
        ],
        "answer": 0,
        "tag": "two-tower bi-encoder",
        "explain": "Instacart uses a two-tower bi-encoder (Sentence Transformers) so each tower independently encodes queries and products into a shared space, allowing product embeddings to be precomputed."
      },
      {
        "q": "Instacart found that naively expanding training data hurt performance. How did they address this?",
        "options": [
          "Cascade training: a warmup phase on a larger noisier dataset with relaxed conversion thresholds, then fine-tuning on smaller curated data with stricter thresholds",
          "Randomly downsampling all training data by 90%",
          "Freezing the product tower and training only the query tower",
          "Switching from in-batch negatives to fully random negatives"
        ],
        "answer": 0,
        "tag": "cascade training",
        "explain": "Noisy incidental cart-adds degraded the model, so they used cascade training: warmup on a large relaxed-threshold set followed by fine-tuning on a curated stricter-threshold set."
      },
      {
        "q": "How does Instacart source positives and handle negatives during training?",
        "options": [
          "Positives from search logs where customers converted (cart adds); in-batch negatives with self-adversarial re-weighting of harder examples",
          "Positives from human-labeled relevance grades; negatives from explicit hard-negative mining only",
          "Positives from impression logs regardless of conversion; no negatives (pure regression on CTR)",
          "Positives from product catalog synonyms; negatives from random noise vectors"
        ],
        "answer": 0,
        "tag": "positives and negatives",
        "explain": "Positive pairs come from converted searches, and off-diagonal in-batch pairs serve as negatives, with self-adversarial re-weighting emphasizing harder cases like 'tortilla' vs. tortilla chips."
      },
      {
        "q": "How does Instacart serve query and product embeddings for retrieval at low latency?",
        "options": [
          "Products indexed in FAISS ANN updated daily; over 95% of query embeddings served from a cached FeatureStore with the rest computed on-the-fly, keeping latency under 8ms",
          "All embeddings recomputed per request on GPU with a 50ms budget",
          "Products stored in an inverted keyword index; queries embedded via a cross-encoder",
          "Both towers run inside the ranking model with no separate ANN index"
        ],
        "answer": 0,
        "tag": "ANN serving",
        "explain": "Products are retrieved via FAISS ANN with daily updates, and more than 95% of query embeddings come from a cached FeatureStore (rest computed live), keeping latency under 8ms."
      }
    ],
    "short": [
      {
        "q": "Explain how Instacart's embedding-based retrieval complements existing retrieval and what online impact it delivered.",
        "model": "Embedding-based retrieval (EBR) complements keyword- and category-based retrieval rather than replacing it, and is especially effective for long or ambiguous queries where lexical matching struggles. The embedding scores are also fed as features into ranking models that balance relevance, popularity, and personalization, and they proved more stable and less popularity-biased than raw clickthrough rates. Online, the system delivered +1.2% mean reciprocal rank, +4.1% cart adds per search, and substantial GMV gains.",
        "points": [
          "EBR is a hybrid complement to keyword/category retrieval, strongest on long/ambiguous queries",
          "Embedding scores also serve as ranking features and are more stable / less popularity-biased than raw CTR",
          "Online results: +1.2% MRR, +4.1% cart adds per search, substantial GMV gains"
        ],
        "tag": "hybrid retrieval and online results"
      }
    ]
  },
  "cs-etsy-dl-search-ranking": {
    "mcq": [
      {
        "q": "What ranking model did Etsy's unified deep learning ranker replace?",
        "options": [
          "A gradient-boosted decision tree (GBDT) model",
          "A linear logistic-regression scorer",
          "A random forest ensemble",
          "A hand-tuned rules-based sorter"
        ],
        "answer": 0,
        "tag": "motivation / prior system",
        "explain": "Etsy's search ranking was previously powered by a gradient-boosted decision tree model whose relevancy gains had begun to plateau."
      },
      {
        "q": "What was the main limitation of the previous tree-based ranker that motivated the move to deep learning?",
        "options": [
          "It relied heavily on manually engineered features and was limited in the input feature types it could take",
          "It could not be trained on GPUs at all",
          "It only supported pointwise, never pairwise, objectives",
          "It required a separate model per query language"
        ],
        "answer": 0,
        "tag": "feature engineering limits",
        "explain": "Decision trees leaned on hand-engineered features and accepted a limited range of input types, so relevancy gains plateaued despite adding more features."
      },
      {
        "q": "Which library sat at the core of Etsy's neural ranking model?",
        "options": [
          "TF Ranking, TensorFlow's learning-to-rank library, with off-the-shelf losses and metrics",
          "XGBoost's ranking module",
          "PyTorch's torchrec",
          "Scikit-learn's LambdaMART implementation"
        ],
        "answer": 0,
        "tag": "learning-to-rank tooling",
        "explain": "Etsy built the unified model on TF Ranking, TensorFlow's learning-to-rank library, reusing its off-the-shelf losses and metrics."
      },
      {
        "q": "Roughly how does Etsy's serving funnel process a single search request before scoring?",
        "options": [
          "It retrieves about 1000 candidate listings, then fetches around 300 features per listing to score and rank them",
          "It scores every listing in the full catalog directly with the deep model",
          "It ranks only the 10 listings shown on the first page with no candidate stage",
          "It retrieves candidates purely at random and relies on the ranker to filter"
        ],
        "answer": 0,
        "tag": "retrieval -> ranking funnel",
        "explain": "A coarse candidate-retrieval stage selects roughly 1000 listings, then about 300 features per listing are fetched and sent to the ranking model."
      }
    ],
    "short": [
      {
        "q": "Beyond relevance, what practical benefits did Etsy report from moving to a unified deep learning ranker, and what new modeling capabilities did it unlock?",
        "model": "The switch let Etsy break past the relevancy plateau of the tree model by using embedding features directly and incorporating multi-modal data rather than depending on hand-engineered features. It also consolidated ranking into a single unified deep learning model built on TF Ranking. Operationally, the neural ranker paid for itself, saving Etsy hundreds of thousands of dollars annually in model serving and training compute compared with the prior system.",
        "points": [
          "Enables embedding features and multi-modal data instead of manual feature engineering",
          "Unified deep learning model built on TF Ranking replaced the GBDT",
          "Cut compute cost by hundreds of thousands of dollars per year"
        ],
        "tag": "benefits and new capabilities"
      }
    ]
  },
  "cs-airbnb-dl-ranking-stays": {
    "mcq": [
      {
        "q": "How does Airbnb's two-tower ranking model learn to represent a good match during training?",
        "options": [
          "One tower encodes query/user into an 'ideal listing for the trip' while the other encodes the listing; booked listings are pushed closer to the ideal and unbooked ones pushed away",
          "Both towers encode the same listing and the model minimizes reconstruction error",
          "A single tower regresses directly onto the nightly price of each listing",
          "The towers are trained separately and never share a loss function"
        ],
        "answer": 0,
        "tag": "two-tower architecture",
        "explain": "The query/user tower predicts an ideal-listing representation and training pulls booked listings toward it while pushing unbooked ones away, giving a +0.6% booking gain."
      },
      {
        "q": "How did Airbnb address positional bias in the ranking model?",
        "options": [
          "Added position as a feature with 15% dropout during training, then set it to zero at inference",
          "Removed the top-ranked listing from every training query",
          "Trained a separate model for each search-result position",
          "Randomly shuffled results for all users to erase position effects"
        ],
        "answer": 0,
        "tag": "position bias",
        "explain": "Position was fed as a feature with 15% dropout during training and zeroed at inference to level the playing field, yielding +0.7% bookings."
      },
      {
        "q": "What was novel about the RNN-based diversity architecture Airbnb introduced?",
        "options": [
          "It builds a 'Query Context Embedding' from the entire result sequence rather than scoring listings independently",
          "It replaced the ranking model entirely with a recurrent classifier",
          "It generated synthetic listings to fill sparse result pages",
          "It clustered users into fixed segments before ranking"
        ],
        "answer": 0,
        "tag": "diversity / listwise context",
        "explain": "The RNN produces a Query Context Embedding over the whole result sequence, letting the model learn patterns like upranking a scarce listing in a popular area (+0.4%)."
      },
      {
        "q": "How did Airbnb improve ranking for new (cold-start) listings?",
        "options": [
          "It estimates engagement from similar listings matched by geographic location and capacity instead of using global defaults",
          "It always ranks new listings at the top for a fixed trial period",
          "It excludes new listings from ranking until they accumulate bookings",
          "It uses a random engagement prior for every new listing"
        ],
        "answer": 0,
        "tag": "cold start",
        "explain": "New listings borrow engagement estimates from geographically and capacity-similar listings, improving new-listing performance +14% and overall bookings +0.4%."
      }
    ],
    "short": [
      {
        "q": "Airbnb frames search ranking as learning from past search outcomes. What is the training signal, and why is mitigating position bias important under that framing?",
        "model": "The model learns from historical search outcomes, treating booked listings as preferred over listings that were shown but not booked, and improvements are validated by the resulting change in booking volume. Because this label comes from logged results, higher-ranked listings get more exposure and thus more bookings simply due to placement, which biases the training signal. Airbnb counters this by adding position as a feature with 15% dropout during training and zeroing it at inference, so the learned preference reflects listing quality rather than where it happened to appear.",
        "points": [
          "Label is booked-over-not-booked from past search logs; success measured by booking volume",
          "Position exposure confounds the signal, inflating listings that ranked high",
          "Position feature + dropout, zeroed at inference, isolates true listing relevance"
        ],
        "tag": "training signal and position bias"
      }
    ]
  },
  "cs-pinterest-prerank": {
    "mcq": [
      {
        "q": "In Pinterest's modernized pre-ranking design, why is the model split into a request-level component and an item-level component?",
        "options": [
          "The request-level part runs once per request so its complexity can scale, while the item-level part does real-time item processing and early user-item feature crossing",
          "The two components are trained on completely different datasets and never combined",
          "The request-level part handles retrieval and the item-level part handles reranking",
          "The split exists only to reduce the number of model parameters"
        ],
        "answer": 0,
        "tag": "decoupled two-component model",
        "explain": "Request-level computation happens once per request (so it can be made complex cheaply) and the item-level component crosses user representation with item features early, unlike a late dot-product."
      },
      {
        "q": "What key limitation of the legacy two-tower light-ranker did the new architecture overcome?",
        "options": [
          "Interaction happened only as a final dot-product, preventing effective use of user action sequences and early feature crossing",
          "It could not be served in real time at all",
          "It required labeling every candidate by hand",
          "It only worked for text pins, not images"
        ],
        "answer": 0,
        "tag": "two-tower vs non-two-tower",
        "explain": "In the two-tower design interaction was a last-stage dot-product, which limited expressiveness and blocked effective use of user action sequences; the non-two-tower model enables early crossing."
      },
      {
        "q": "How does Pinterest align the pre-ranking model with the full (L2) ranker?",
        "options": [
          "A distillation loss minimizing KL divergence between the L2 ranker's calibrated scores and the pre-ranking predictions, combined with a binary cross-entropy loss via a weighting hyperparameter",
          "By copying the L2 ranker's weights directly into the pre-ranker",
          "By running the L2 ranker on every candidate and caching the output",
          "By training the pre-ranker only on the L2 ranker's top-1 pick"
        ],
        "answer": 0,
        "tag": "distillation across stages",
        "explain": "The pre-ranker jointly optimizes BCE on engagement labels and a KL-divergence distillation loss against L2 ranker calibrated scores, weighted by a hyperparameter, to stay consistent with full ranking."
      },
      {
        "q": "How does Pinterest reduce selection bias in the pre-ranking training data?",
        "options": [
          "A dedicated early-funnel logging pipeline records unimpressed candidates from the pre-ranking stage and mixes them with impression data as real negatives",
          "It trains only on impressed items to keep labels clean",
          "It duplicates positive samples to balance the classes",
          "It discards all candidates that were not eventually clicked"
        ],
        "answer": 0,
        "tag": "selection bias / early-funnel logs",
        "explain": "Training only on impressed items biases the model; Pinterest logs unimpressed pre-ranking candidates and combines them with impressions to supply real negative samples matching serving conditions."
      }
    ],
    "short": [
      {
        "q": "Describe Pinterest's root-leaf serving architecture for pre-ranking and the latency/cost tradeoff it manages.",
        "model": "Because the modernized item-level model computes features online in real time rather than using precomputed embeddings, raw feature fetching becomes expensive. Pinterest uses a root-leaf distributed design where root hosts receive a request and route items to leaf hosts that own specific item shards, and each leaf caches features for its shard locally. This raises cache hit rates and lets the system scale to a large item corpus without every host holding all features, cutting infrastructure cost while absorbing the added latency of online computation.",
        "points": [
          "Root hosts route items to leaf hosts that each own an item shard",
          "Leaf-local feature caching improves cache hit rate and avoids per-host memory blowup",
          "Manages the tradeoff of online real-time feature computation (slower but dynamic) against precomputed embeddings (fast but static)"
        ],
        "tag": "root-leaf serving and latency tradeoff"
      }
    ]
  },
  "cs-glassdoor-multistage": {
    "mcq": [
      {
        "q": "Glassdoor's recommendation system is organized as a multi-stage funnel. What is the PRIMARY engineering benefit the article credits to this staged, modular design?",
        "options": [
          "It lets each stage (candidate generation, filtering, scoring, ordering) be A/B tested and improved independently",
          "It guarantees sub-millisecond end-to-end latency",
          "It removes the need for any embeddings or vector search",
          "It allows the entire pipeline to run on a single monolithic service"
        ],
        "answer": 0,
        "tag": "multi-stage funnel rationale",
        "explain": "The article states the architecture enables running independent A/B tests for each stage separately, allowing isolated diagnosis and improvement of components."
      },
      {
        "q": "In the candidate-generation stage, how does Glassdoor produce and retrieve semantic candidates?",
        "options": [
          "It uses only exact keyword matching against a SQL database",
          "An LLM generates N-dimensional embeddings that are retrieved via Approximate Nearest Neighbor (ANN) search over a vector database (OpenSearch)",
          "It relies exclusively on a gradient-boosted tree ranking every item",
          "It generates candidates by random sampling from the full catalog"
        ],
        "answer": 1,
        "tag": "candidate generation / ANN retrieval",
        "explain": "Candidate generation uses LLM-produced embeddings and Approximate Nearest Neighbor plus filter-based search, with OpenSearch as the primary vector database."
      },
      {
        "q": "The team ran an A/B test comparing 128-dimensional versus 384-dimensional embedding vectors. What did they conclude?",
        "options": [
          "128-dim vectors were both faster and more relevant, so they were adopted",
          "384-dim vectors outperformed 128-dim on relevance while keeping similar latency and throughput",
          "The two dimensions performed identically, so cost decided it",
          "384-dim vectors were more relevant but had to be rejected for being far too slow"
        ],
        "answer": 1,
        "tag": "embedding dimension tradeoff",
        "explain": "The article reports 384-dim vectors outperformed 128-dim ones while maintaining similar latency and throughput."
      },
      {
        "q": "How is the ML scoring component deployed relative to the main Recommendation Service, and why?",
        "options": [
          "Embedded inside the Recommendation Service so models cannot be swapped without a full redeploy",
          "Decoupled as a separate service (MLflow-packaged, served on Gunicorn/Kubernetes) to allow independent scaling and deploying/testing different models",
          "Run as an offline batch job whose scores are precomputed nightly with no online serving",
          "Delegated entirely to the OpenSearch vector database's built-in ranking"
        ],
        "answer": 1,
        "tag": "decoupled scoring service",
        "explain": "The scoring service is decoupled from the main Recommendation Service, packaged with MLflow and served over Gunicorn on Kubernetes, enabling modular scaling and independent model deployment/testing."
      }
    ],
    "short": [
      {
        "q": "Describe the stages of Glassdoor's recommendation funnel and explain the core system-design argument for splitting the work into separate stages rather than one model.",
        "model": "Glassdoor uses a five-stage pipeline: candidate generation (hybrid collaborative/content-based retrieval via LLM embeddings, ANN, and inverted indexes over OpenSearch), filtering (removing hidden/flagged/inappropriate posts by business rules), scoring (a decoupled ML service assigning relevance), and ordering (randomization, diversification, ranking, pagination), all sitting on supporting data-store, experimentation, and monitoring layers. The central design argument is modularity: each stage can be analyzed, A/B tested, and improved independently, which speeds iteration and isolates diagnostics. This also lets the scoring model be deployed and swapped independently of the retrieval layer.",
        "points": [
          "Stages: candidate generation, filtering, scoring, ordering (+ supporting infra)",
          "Modularity enables independent A/B testing and diagnostics per stage",
          "Embedding/ANN retrieval narrows candidates before a heavier decoupled scoring model"
        ],
        "tag": "funnel design rationale"
      }
    ]
  },
  "cs-etsy-multitask-ranker": {
    "mcq": [
      {
        "q": "Why did Etsy build a single 'canonical' ranker instead of continuing with separate per-surface models?",
        "options": [
          "To use one multi-task model to power recommendations across many modules on both web and app",
          "Because multi-task learning is impossible with per-surface models",
          "To eliminate the need for any online A/B testing",
          "Because a single model requires no feature engineering"
        ],
        "answer": 0,
        "tag": "canonical ranker motivation",
        "explain": "The canonical ranker is a single multi-task model designed to power multiple recommendation modules across web and app, replacing many separate per-surface models."
      },
      {
        "q": "What does the shared-bottom architecture used by Etsy's ranker look like?",
        "options": [
          "Every task has a completely separate network with no shared parameters",
          "Tasks share lower layers that capture what they have in common, then diverge into separate task-specific layers toward the top",
          "A single linear layer predicts all tasks with tied weights",
          "The tasks share the top layers but split at the input embeddings"
        ],
        "answer": 1,
        "tag": "shared-bottom architecture",
        "explain": "The shared-bottom structure expresses what tasks have in common in shared bottom layers and diverges into separate task-specific layers toward the top; it served as an efficient benchmark model."
      },
      {
        "q": "Which two events does the multi-task ranker primarily predict, and how are they used?",
        "options": [
          "Impressions and dwell time, averaged into a single score",
          "The probability of an item being favorited and the probability of it being purchased, combined into the final ranking score",
          "Only clicks, later calibrated to purchases",
          "Ad revenue and return rate, subtracted from each other"
        ],
        "answer": 1,
        "tag": "task heads (favorite + purchase)",
        "explain": "For a given item the model predicts both the probability of being favorited and of being purchased, and the two scores are combined into the final ranking score."
      },
      {
        "q": "How did Etsy enhance the plain shared-bottom design, and what was the stated tradeoff?",
        "options": [
          "By switching to a single-task model, sacrificing relevance for speed",
          "By adding an MMoE (Multi-gate Mixture of Experts) expert layer so favorites and purchases can learn different representations, at little extra computation cost",
          "By removing the shared layers entirely to halve training time",
          "By replacing neural layers with a rule-based scorer to cut latency"
        ],
        "answer": 1,
        "tag": "MMoE enhancement",
        "explain": "Etsy added an MMoE expert layer giving favorites and purchases flexibility to learn different representations from the embeddings, yielding more relevant recommendations with little extra compute."
      }
    ],
    "short": [
      {
        "q": "Explain how Etsy handles the fact that its ranker jointly optimizes multiple positive events (favorites and purchases) with differing importance across modules.",
        "model": "Because favorites and purchases are both positive events but not equally valuable, Etsy assigns sample weights both in the loss-function computation and in the final score-combination step, and it invested significant manual effort tuning the optimal per-task weights. It also uses different weights for different interaction types (impressions, clicks, favorites, purchases), reasoning that the correlation between interaction types can differ from module to module (e.g., clicks may pattern like favorites on one module but not another). This per-task, per-module weighting, layered on the MMoE experts, let one canonical model serve multiple surfaces; after launch on an item-page and a homepage module it delivered up to a 12.5% improvement in module-based favorite NDCG.",
        "points": [
          "Sample/task weights applied in both the loss and the final score combination",
          "Weights tuned manually and vary by interaction type and by module",
          "One canonical multi-task model serves many modules; ~12.5% favorite-NDCG lift reported"
        ],
        "tag": "multi-task loss weighting"
      }
    ]
  },
  "cs-linkedin-ctr-dl": {
    "mcq": [
      {
        "q": "LinkedIn's deep-learning ads CTR model is built from three towers. What is each tower's role?",
        "options": [
          "Three identical deep MLPs averaged together for robustness",
          "A deep tower for full feature interactions (generalization), a wide linear tower for sparse ID features (memorization), and a shallow tower for calibration",
          "One tower per surface: feed, search, and messaging",
          "A CNN tower, an RNN tower, and a transformer tower"
        ],
        "answer": 1,
        "tag": "three-tower architecture",
        "explain": "The model combines a deep tower (MLP for full feature interactions), a wide tower (linear layer over sparse ID features for memorization), and a shallow tower (linear layer for calibration)."
      },
      {
        "q": "The deep model over-predicted pCTR by about 40%. How did LinkedIn reduce this over-prediction?",
        "options": [
          "By lowering the learning rate until predictions dropped",
          "By adding the shallow tower (acting like a residual block), which cut over-prediction from ~40% to ~10%",
          "By discarding all ID features from the model",
          "By training only on clicked impressions"
        ],
        "answer": 1,
        "tag": "calibration via shallow tower",
        "explain": "Adding the shallow tower reduced over-prediction from 40% to ~10%; it acts as a residual block so the deep tower learns the residual over the linear mapping, producing less overconfident predictions."
      },
      {
        "q": "To keep ad-performance signals fresh, LinkedIn retrains parts of the model at different cadences. Which part is warm-started most frequently (hourly)?",
        "options": [
          "The deep tower, retrained from scratch every hour",
          "The wide tower (sparse ID / memorization features), warm-started hourly while deep + shallow towers are cold-started daily",
          "The shallow calibration tower only, hourly",
          "All three towers are fully retrained hourly"
        ],
        "answer": 1,
        "tag": "partial retraining cadence",
        "explain": "The lightweight wide tower (memorization features) is warm-started hourly, while the deep and shallow towers are cold-started daily; hourly retraining noticeably improved performance."
      },
      {
        "q": "After the shallow tower, ~10% over-prediction remained and offline isotonic-regression calibration failed to generalize online. What was the root cause and fix?",
        "options": [
          "The model was too small; the fix was more layers",
          "Exposure bias -- offline data was skewed by the baseline model's auction wins -- fixed by gradually ramping traffic and calibrating on data the deep model itself generated",
          "A bug in the loss function; the fix was switching to cross-entropy",
          "Too few features; the fix was adding more ID embeddings"
        ],
        "answer": 1,
        "tag": "exposure bias / calibration",
        "explain": "Offline data was biased because only baseline-model auction winners were exposed; ramping traffic and calibrating on the deep model's own serving distribution drove over-prediction toward 0%."
      }
    ],
    "short": [
      {
        "q": "LinkedIn initially tried injecting offline embeddings into the baseline model before committing to serving the full deep model online. Why did the embedding-only approach fail, and what tradeoff did the final choice accept?",
        "model": "The embedding-only approach fed precomputed offline embeddings into the existing GLMix-style baseline, but those embeddings could not capture cross-feature interactions -- especially the interaction between context features and member/ad features -- which the team found critical to the relevance gains seen in A/B tests. So LinkedIn instead served the entire deep model online, accepting higher infrastructure and serving complexity in exchange for full end-to-end feature interactions. This end-to-end deep model delivered a +8.5% CTR lift over the GLMix baseline, supported by frameworks like GDMix for training and Lambda Learner for nearline/frequent retraining.",
        "points": [
          "Offline embeddings could not model cross-feature (esp. context) interactions",
          "They chose to serve the full deep model online despite higher infra cost",
          "Result: +8.5% CTR over GLMix; context-feature interactions drove the lift"
        ],
        "tag": "embeddings-only vs end-to-end deep serving"
      }
    ]
  },
  "cs-snap-ad-ranking": {
    "mcq": [
      {
        "q": "Rather than predicting a single pCTR, Snap's heavy ranking models predict multiple conversion events jointly. Which model families does the article cite for this?",
        "options": [
          "Logistic regression and random forests",
          "Multi-task models such as MMoE and PLE, predicting events like app installs, purchases, and sign-ups jointly",
          "A single-task XGBoost model per event",
          "K-means clustering over ad embeddings"
        ],
        "answer": 1,
        "tag": "multi-task conversion prediction",
        "explain": "Snap uses multi-task models such as MMoE and PLE to predict multiple conversion events (app installs, purchases, sign-ups) jointly."
      },
      {
        "q": "Why does calibration matter in Snap's ad ranking in a way it often does not for pure ranking systems?",
        "options": [
          "Only the relative ordering of ads matters, so absolute values are irrelevant",
          "The total predicted conversions must be close to the true total conversions across major business segments (absolute values feed the auction/bidding), not just relative order",
          "Calibration is needed only to speed up inference",
          "Calibration is used purely to compress the model for TPUs"
        ],
        "answer": 1,
        "tag": "calibration requirement",
        "explain": "Unlike pure ranking where only relative scores matter, the predicted total conversions must match true totals on major segments because absolute probabilities drive the auction."
      },
      {
        "q": "The article describes 'auction-induced selection bias.' What is it?",
        "options": [
          "Users bias which ads they click, skewing labels",
          "Models train on ads that won auctions but must score all candidates; an outlier over-prediction on a candidate can make the auction pick the wrong ad instead of the most relevant one",
          "Advertisers bid randomly, biasing budgets",
          "The TPU hardware introduces numerical bias in scores"
        ],
        "answer": 1,
        "tag": "auction selection bias",
        "explain": "Models are trained on auction winners yet predict on all candidates, so a mistaken outlier score lets the auction select that ad instead of the most relevant one."
      },
      {
        "q": "Because ad inventory changes fast, which problem does the article single out as becoming dominant, requiring frequent model updates?",
        "options": [
          "GPU memory fragmentation",
          "Out-of-vocabulary (previously unseen) ad-ids becoming the dominant case within days, so the model must stay current with new ad identifiers",
          "Users churning off the platform",
          "Feature store schema drift in the frontend"
        ],
        "answer": 1,
        "tag": "OOV ad-ids / freshness",
        "explain": "After a few days the fraction of out-of-vocabulary ad-ids becomes dominant, making it critical to keep the model up to date with new ad-ids."
      }
    ],
    "short": [
      {
        "q": "Snap notes that conversion labels can arrive weeks after the impression. Explain the tradeoff this creates and how Snap addresses calibration and freshness in production.",
        "model": "Conversions can take a few weeks to be observed, creating a tension: a model trained only on fully-matured (delayed) labels is accurate but stale, whereas updating faster means training on incomplete labels. Snap handles this with frequent/periodic batch updates via SGD on new data to stay fresh, and separately corrects absolute accuracy with an automated calibration-correction layer (Platt scaling, isotonic regression, or small neural nets) so predicted totals match true conversion totals per business segment. It measures offline quality with Normalized Cross Entropy (NCE) and uses budget-split A/B testing -- splitting each advertiser's budget into N parts and assigning users to splits -- to get unbiased online reads in a two-sided marketplace.",
        "points": [
          "Delayed conversions force a stale-vs-incomplete-label tradeoff, met with frequent batch/SGD updates",
          "A calibration-correction layer (Platt/isotonic/NN) keeps predicted totals matched to true totals",
          "NCE is the offline metric; budget-split A/B testing gives unbiased online marketplace results"
        ],
        "tag": "delayed conversions, calibration, freshness"
      }
    ]
  },
  "cs-pinterest-ads-conversion": {
    "mcq": [
      {
        "q": "Why did Pinterest adopt multi-task learning (MTL) that co-trains clicks, good clicks, checkout, and add-to-cart objectives together?",
        "options": [
          "To leverage abundant onsite engagement signals to improve prediction of sparse offsite conversions while cutting serving and maintenance cost",
          "To eliminate the need for any deep neural network layers",
          "To replace the LightGBM ranker used elsewhere in the stack",
          "To avoid having to log features at serving time"
        ],
        "answer": 0,
        "tag": "multi-task learning",
        "explain": "MTL used plentiful onsite signals to help the sparse offsite conversion task and reduced the cost of serving and maintaining many separate models."
      },
      {
        "q": "Which feature-interaction module does the article describe as instance-guided masks using element-wise products and 'one of the most popular modules in advertising'?",
        "options": [
          "DCNv2",
          "MaskNet",
          "Transformer self-attention",
          "Shared-bottom"
        ],
        "answer": 1,
        "tag": "feature interaction modules",
        "explain": "MaskNet is described as applying instance-guided masks via element-wise products and being a widely popular advertising module."
      },
      {
        "q": "What GPU serving optimization required static tensor shapes, and how did Pinterest satisfy that requirement for ragged/dynamic tensors?",
        "options": [
          "Mixed precision (FP16); by downcasting all tensors",
          "CUDA Graphs; by zero-padding ragged and dynamically-shaped tensors",
          "CUDA Graphs; by discarding variable-length sequences",
          "Shared-bottom decoupling; by hashing sparse IDs"
        ],
        "answer": 1,
        "tag": "GPU serving / CUDA Graphs",
        "explain": "CUDA Graphs reduce kernel-launch overhead but need static tensor shapes, so Pinterest zero-padded ragged and dynamically-shaped tensors to keep the graph valid."
      },
      {
        "q": "What is the primary label-quality challenge the article cites for offsite conversion modeling?",
        "options": [
          "Conversions arrive with a long-tail delay, creating false-negative labels during training, plus probabilistic user-match/attribution noise",
          "Conversions are always observed instantly but are duplicated across advertisers",
          "Advertisers never report checkout events",
          "Labels are perfectly clean but too few in number to train a DNN"
        ],
        "answer": 0,
        "tag": "delayed feedback / label quality",
        "explain": "Conversions have a long-tail delay distribution (producing false negatives) and the probabilistic user-match/attribution process further injects noise."
      }
    ],
    "short": [
      {
        "q": "Describe how Pinterest's ads conversion model architecture evolved from the 2018 system to the final DHEN-based design, and the key tradeoffs at each step.",
        "model": "Pinterest started in 2018 with a hybrid GBDT + logistic regression using feature hashing for sparse ad-space IDs, then moved to AutoML with automatic feature engineering to drop manual interaction crafting. They introduced deep interaction modules (DCNv2, Transformer, MaskNet), initially in-model ensembling DCNv2 + Transformer via a curated fusion formula, but the Transformer added memory and latency cost. To cut infrastructure cost they decoupled feature interaction from processing with a shared-bottom architecture, and finally converged on the DHEN framework combined with user-sequence modeling and MaskNet for the best offline and online performance. Serving moved to GPUs with CUDA Graphs (zero-padding for static shapes) and FP16 mixed precision to run the larger models at low latency.",
        "points": [
          "2018 GBDT + logistic regression with feature hashing, then AutoML feature engineering",
          "DCNv2/Transformer/MaskNet interaction modules; Transformer traded accuracy for memory/latency",
          "Shared-bottom decoupling cut cost; DHEN + user sequence + MaskNet was the final best design, served on GPU with CUDA Graphs and FP16"
        ],
        "tag": "architecture evolution"
      }
    ]
  },
  "cs-pinterest-online-offline": {
    "mcq": [
      {
        "q": "What core symptom defines the online-offline discrepancy Pinterest describes in its ads ranking system?",
        "options": [
          "Offline ROC-AUC gains frequently failed to produce the expected online CPA (cost-per-acquisition) improvements",
          "Online latency was always higher than offline batch inference",
          "The offline model trained faster than it could be served",
          "Advertisers saw more conversions offline than online"
        ],
        "answer": 0,
        "tag": "discrepancy definition",
        "explain": "The central problem was that offline ROC-AUC improvements did not reliably translate into online CPA gains."
      },
      {
        "q": "According to the article, why can two Pinterest ML server requests (one to score all candidates, one to log the winners) produce different feature values?",
        "options": [
          "The model weights are updated between the two requests",
          "The asynchronous logging setup can read a different/stale feature-cache state between the scoring and logging calls",
          "The logging request uses a completely different model architecture",
          "The two requests always hit different data centers"
        ],
        "answer": 1,
        "tag": "serving-logging discrepancy",
        "explain": "The scoring and logging requests are separate, so feature-cache staleness between them can yield different feature values (training-serving skew)."
      },
      {
        "q": "What robustness failure surfaced during an online experiment when queries-per-second peaked?",
        "options": [
          "The model overfit to peak-hour traffic",
          "Feature servers returned 'Null' values for requests that could not complete in time, degrading the treatment model",
          "The GPU ran out of memory and dropped candidates",
          "The logging pipeline duplicated every impression"
        ],
        "answer": 1,
        "tag": "feature robustness under load",
        "explain": "At high QPS the feature servers timed out and served Null values, exposing that the model needed robustness to missing features during load spikes."
      },
      {
        "q": "Which solution did Pinterest adopt to unify feature computation and reduce per-use-case skew?",
        "options": [
          "Rewriting every feature as a custom C++ UDF per model",
          "Moving from custom C++ UDFs to flattened feature definitions centralizing preprocessing in the feature store / model trainer",
          "Disabling all aggregated (7-day) features",
          "Serving directly from S3 backfilled data at request time"
        ],
        "answer": 1,
        "tag": "unified feature representation",
        "explain": "They replaced per-use-case C++ UDFs with flattened feature definitions so preprocessing logic was centralized rather than duplicated across binaries."
      }
    ],
    "short": [
      {
        "q": "Explain the main root causes of the online-offline discrepancy Pinterest identified and two concrete mitigations they built.",
        "model": "Root causes included metric misalignment (ROC-AUC measures ranking quality but does not map cleanly to the conversion probabilities used for bidding or to CPA's business logic), feature distribution shifts between S3-backfilled training data and cache-served features, feature staleness (e.g., 7-day aggregates refreshing only at 3 AM UTC), and serving-logging discrepancy where separate scoring and logging requests read different cache states. Mitigations included keeping a small on-server feature log to compare against the asynchronous logging pipeline and running confidence checks before backfilling, unifying the serving-logging path to use the same cached values, and adding Feature Stats Validation plus batch-inference replay to simulate missing/corrupted features and test model stability.",
        "points": [
          "Metric misalignment (AUC vs CPA) plus training-serving feature skew and staleness",
          "Serving-logging path unified so score and log requests share the same cached feature value",
          "Feature Stats Validation, on-server feature logging comparison, and batch-inference replay for robustness testing"
        ],
        "tag": "root causes and mitigations"
      }
    ]
  },
  "cs-meta-sequence-ads": {
    "mcq": [
      {
        "q": "What is the fundamental modeling shift Meta made for personalized ads with sequence learning?",
        "options": [
          "From event-based sequences back to aggregated sparse counts",
          "From DLRMs with manually engineered aggregated sparse features to an event-based sequence learning paradigm that models temporal ordering of user actions",
          "From GPU serving back to CPU serving",
          "From transformers to gradient-boosted trees"
        ],
        "answer": 1,
        "tag": "modeling paradigm shift",
        "explain": "Meta moved from DLRMs using hand-engineered aggregated sparse features to event-based sequence learning that preserves the temporal order of user actions."
      },
      {
        "q": "How did Meta reduce the self-attention complexity in its custom transformer for user event sequences?",
        "options": [
          "By dropping attention entirely and using sum pooling",
          "By reducing O(N^2) to O(M x N) via multi-headed attention pooling, where M is tunable and N is max sequence length",
          "By fixing sequence length to 1",
          "By quantizing weights to 1-bit"
        ],
        "answer": 1,
        "tag": "attention complexity",
        "explain": "Multi-headed attention pooling cut self-attention cost from O(N^2) to O(M x N), with M a tunable parameter and N the max sequence length."
      },
      {
        "q": "What custom module did Meta build to run flash attention efficiently on variable-length user sequences?",
        "options": [
          "Jagged Flash Attention operating on variable-length jagged tensors",
          "Dense padded attention with fixed batch shapes",
          "Sparse hashing attention",
          "CUDA Graph attention"
        ],
        "answer": 0,
        "tag": "jagged tensors / efficiency",
        "explain": "They developed Jagged Flash Attention to apply flash attention to variable-length jagged tensors with GPU kernel-level optimization."
      },
      {
        "q": "What online result did Meta report after launching the sequence learning redesign?",
        "options": [
          "A 100X latency reduction",
          "2-4% more conversions on select segments",
          "No measurable change in conversions",
          "A 50% reduction in ad inventory"
        ],
        "answer": 1,
        "tag": "online results",
        "explain": "The redesign delivered 2-4% more conversions on select segments alongside better prediction accuracy and more efficient infrastructure use."
      }
    ],
    "short": [
      {
        "q": "Describe Meta's Event-Based Features (EBFs) and the two-layer sequence model, and explain why this beats legacy aggregated sparse features.",
        "model": "Event-Based Features standardize heterogeneous user inputs along three dimensions: event streams (sequences of engagements like clicks and likes), a tunable sequence length controlling how many recent events are included, and per-event information such as ad category and timestamps. The Event Model layer synthesizes event embeddings by linearly compressing attributes and combining timestamp encodings to capture recency and order, and the Sequence Model layer is a custom transformer with advanced attention (reduced to O(M x N) via attention pooling) that processes these embedding sequences. This beats legacy DLRM aggregated sparse features because those counts lose the sequential ordering of a person's journey, whereas EBFs preserve temporal structure that improves prediction accuracy.",
        "points": [
          "EBFs standardize event streams, tunable sequence length, and per-event info (category, timestamp)",
          "Event Model layer builds time-aware embeddings; Sequence Model layer is a custom transformer with pooled attention",
          "Preserves temporal ordering that aggregated sparse counts discard, improving accuracy"
        ],
        "tag": "EBFs and sequence architecture"
      }
    ]
  },
  "cs-canva-keyword-bidding": {
    "mcq": [
      {
        "q": "How did Canva formulate the Apple Search Ads keyword bidding problem?",
        "options": [
          "As a real-time per-impression auction bidder",
          "As maximizing return (new active users / ROAS) subject to a daily budget constraint across thousands of keywords",
          "As a classification of good vs bad keywords",
          "As minimizing total number of keywords bid on"
        ],
        "answer": 1,
        "tag": "optimization objective",
        "explain": "They framed it as constrained optimization: maximize return subject to daily budget limits across many keywords per campaign."
      },
      {
        "q": "Why did Canva use survival analysis (Turnbull's non-parametric EM) in the bid-to-spend model?",
        "options": [
          "To forecast conversion delay",
          "To handle interval-censored data from ASA auctions (right censoring when outbid, left censoring when impressions win with no taps)",
          "To cluster keywords by semantic similarity",
          "To compress the model for edge serving"
        ],
        "answer": 1,
        "tag": "bid-to-spend / censored data",
        "explain": "Turnbull's EM handles interval-censored auction data: right censoring (unknown competitor bids when outbid) and left censoring (winning impressions with no tap/charge)."
      },
      {
        "q": "How does Canva's spend-to-return model enable exploration rather than pure exploitation?",
        "options": [
          "It adds random noise to every bid uniformly",
          "It fits distributions of Hill-function curves per keyword and uses Thompson sampling, so sparse keywords have higher-variance sampled curves",
          "It always bids the campaign maximum on new keywords",
          "It disables bidding on high-confidence keywords"
        ],
        "answer": 1,
        "tag": "exploration / Thompson sampling",
        "explain": "By fitting curve distributions and Thompson-sampling from them daily, low-data keywords get high-variance curves that naturally explore varied spend levels."
      },
      {
        "q": "How does Canva handle cold-start keywords with little historical data?",
        "options": [
          "It excludes them from bidding entirely",
          "It uses a global LightGBM model trained across all keywords to generate 15-20 synthetic prior data points for the keyword's curve",
          "It copies the bid from the single highest-spending keyword",
          "It waits 6 hours before assigning any bid"
        ],
        "answer": 1,
        "tag": "cold-start handling",
        "explain": "A global LightGBM model generates 15-20 synthetic data points as priors so sparse keywords have a reasonable curve until real data accrues."
      }
    ],
    "short": [
      {
        "q": "Walk through Canva's daily end-to-end keyword bidding loop and explain why it runs daily rather than in real time, plus the soft-constraint tradeoff.",
        "model": "Each day Canva trains the bid-to-spend model (survival analysis via Turnbull EM on censored auction data) and the spend-to-return model (Hill-function curve distributions enforcing non-decreasing but diminishing returns, sampled via Thompson sampling). It then solves the budget-constrained optimization with L-BFGS to find ideal spend per keyword, converts those spend targets back into bids via the inverse bid-to-spend function, and pushes bids to Apple Search Ads through reverse ETL. It runs daily rather than real time because the primary metrics (new active users, ROAS) are insensitive to sub-24-hour bid changes, so a daily loop suffices. They also relaxed the exact budget from a hard to a soft constraint to speed L-BFGS convergence, accepting small daily deviations because the daily feedback loop still converges toward the weekly budget target.",
        "points": [
          "Train bid-to-spend and spend-to-return models, solve with L-BFGS, invert to bids, push via reverse ETL",
          "Runs daily because target metrics are insensitive to sub-24-hour bid changes",
          "Soft (vs hard) budget constraint speeds convergence; daily loop converges to weekly budget"
        ],
        "tag": "bidding loop and tradeoffs"
      }
    ]
  },
  "cs-doordash-explore-exploit": {
    "mcq": [
      {
        "q": "Which exploration algorithm does DoorDash integrate into its homepage ranking framework?",
        "options": [
          "Upper Confidence Bound (UCB), a multi-armed-bandit method",
          "Epsilon-greedy random sampling of stores",
          "Deep Q-Network (DQN) reinforcement learning",
          "Softmax / Boltzmann exploration over store scores"
        ],
        "answer": 0,
        "tag": "exploration algorithm",
        "explain": "DoorDash's exploration is based on the Upper Confidence Bound (UCB), a method known for solving multi-armed-bandit problems."
      },
      {
        "q": "What does DoorDash's deep-learning learn-to-rank model, the Universal Ranker (UR), predict?",
        "options": [
          "The predicted conversion rate (pConv) of a store / carousel of stores",
          "The exact delivery time for each order",
          "The lifetime value of each consumer",
          "The probability a Dasher accepts an order"
        ],
        "answer": 0,
        "tag": "reward / prediction target",
        "explain": "The Universal Ranker is a deep-learning LTR model that predicts the conversion rate (pConv) of stores/carousels, which serves as the exploitation signal."
      },
      {
        "q": "How is the final UCB score for an entity constructed in DoorDash's system?",
        "options": [
          "By blending the UR predicted conversion (pConv) with an uncertainty term",
          "By taking only the raw UR conversion score",
          "By ranking purely on historical revenue per store",
          "By sampling from a learned Beta posterior for each store"
        ],
        "answer": 0,
        "tag": "exploitation + exploration blend",
        "explain": "The final UCB score blends the UR score (pConv, exploitation) with an estimated uncertainty term (exploration)."
      },
      {
        "q": "How does DoorDash estimate the uncertainty that drives the exploration bonus?",
        "options": [
          "From the count of consumer-entity impressions used to track effective recommendation trials",
          "From the number of Dashers currently online near the store",
          "From the variance of menu prices at the store",
          "From the store's star rating volatility over time"
        ],
        "answer": 0,
        "tag": "uncertainty estimation",
        "explain": "Consumer-entity impressions track the effective recommendation trials and are used to estimate the uncertainty of the predicted conversion (pConv)."
      }
    ],
    "short": [
      {
        "q": "Explain how DoorDash's homepage recommender trades off exploitation and exploration, and why fewer-seen entities get boosted.",
        "model": "The Universal Ranker (UR), a deep-learning learn-to-rank model, predicts each entity's conversion rate (pConv), which is the exploitation signal. Exploration is layered on with a UCB scheme: the number of consumer-entity impressions is used to estimate how uncertain the pConv estimate is, and this uncertainty is blended into a final UCB score. Entities that have been shown less have higher uncertainty and therefore receive a larger exploration bonus, so they get surfaced to gather feedback. This can be viewed from a Bayesian perspective, and the underlying data is refreshed daily; the goal is better marketplace diversity, fairness, and long-term growth rather than only short-term conversion.",
        "points": [
          "UR predicts pConv = exploitation signal",
          "UCB adds an uncertainty/confidence bonus for exploration",
          "Uncertainty is estimated from consumer-entity impression counts, so less-shown entities get boosted",
          "Aim is marketplace diversity/fairness and long-term growth, not just short-term conversion"
        ],
        "tag": "explore-exploit tradeoff"
      }
    ]
  },
  "cs-instacart-contextual-bandits": {
    "mcq": [
      {
        "q": "How does Instacart make the action space tractable for its contextual bandit instead of treating each product as an action?",
        "options": [
          "Actions are a small set of ranking formulas that weight objectives like relevance, popularity, price, and availability",
          "Actions are individual products retrieved from a nearest-neighbor index",
          "Actions are full ranked permutations of the entire catalog",
          "Actions are individual store departments"
        ],
        "answer": 0,
        "tag": "large action space design",
        "explain": "Instacart defines actions as ranking formulas combining objective weights (e.g., relevance/popularity/price/availability), avoiding the intractable per-product action space."
      },
      {
        "q": "What modeling approach did Instacart use to estimate which action is best for a given context?",
        "options": [
          "An X-learner that estimates Conditional Average Treatment Effect (CATE) per action",
          "Thompson sampling over per-product Beta distributions",
          "A cascade click model with position-dependent examination",
          "A pure epsilon-greedy over ranking formulas"
        ],
        "answer": 0,
        "tag": "CATE / X-learner",
        "explain": "They used the X-learner framework to estimate each action's CATE (lift versus control) and recommend the highest-lift action."
      },
      {
        "q": "What is Instacart's primary reward metric for the bandit?",
        "options": [
          "Cart Adds Per Search (CAPS)",
          "Click-through rate on the first result",
          "Session length in minutes",
          "Number of searches per user per day"
        ],
        "answer": 0,
        "tag": "reward definition",
        "explain": "The primary reward is Cart Adds Per Search (CAPS), with GMV per search as a secondary metric."
      },
      {
        "q": "Which pair of estimators did Instacart use for off-policy / counterfactual evaluation before A/B testing?",
        "options": [
          "Inverse Propensity Sampling (IPS) and Doubly Robust (DR)",
          "CascadeUCB and CascadeKL-UCB",
          "Beta-binomial posterior mean and UCB",
          "Precision@k and NDCG"
        ],
        "answer": 0,
        "tag": "off-policy evaluation",
        "explain": "They printed IPS (weighting rewards by pnew/p0) and Doubly Robust estimates each epoch and selected policies maximizing them before A/B testing."
      }
    ],
    "short": [
      {
        "q": "How did Instacart collect unbiased data to train and off-policy-evaluate its contextual bandit, and what was the online outcome?",
        "model": "Instacart ran randomized experiments in which customers were randomly assigned to variants, with each variant always using one fixed action (ranking formula); they seeded the initial action set by perturbing production coefficients by roughly +/-20%. This random assignment guarantees exploration and gives the propensities needed for off-policy evaluation. They then used IPS and Doubly Robust estimators to score candidate policies offline before launching an A/B test. Online, the X-learner/XGBoost policy produced about a 0.6% increase in CAPS for Android (price-sensitive) users and a positive but not statistically significant GMV-per-user lift; XGBoost was chosen for production over the X-learner mainly for lower latency.",
        "points": [
          "Randomized variant assignment (each variant = one fixed action) provides exploration and known propensities",
          "Initial actions came from +/-20% perturbations of production ranking coefficients",
          "IPS and Doubly Robust used to pick policies offline before A/B testing",
          "~0.6% CAPS lift for Android users; XGBoost deployed over X-learner for lower latency"
        ],
        "tag": "data collection + results"
      }
    ]
  },
  "cs-trivago-explore-exploit-ranking": {
    "mcq": [
      {
        "q": "What was Trivago's purely exploitative baseline for ranking accommodations?",
        "options": [
          "The posterior mean of a beta-binomial performance model used as a ranking feature",
          "A CascadeLinTS Thompson-sampling ranker",
          "An epsilon-greedy shuffle of the top 25 results",
          "A DQN trained on click logs"
        ],
        "answer": 0,
        "tag": "baseline",
        "explain": "The baseline modeled historical inventory performance with a beta-binomial distribution and exported the posterior mean as a ranking feature, which is purely exploitative."
      },
      {
        "q": "What was Trivago's first (naive) exploration scoring rule?",
        "options": [
          "mean + lambda * standard_deviation, favoring high-uncertainty (fewer-impression) items",
          "mean * lambda, scaling down popular items",
          "A Thompson sample drawn from the beta posterior",
          "mean - lambda * standard_deviation, penalizing uncertain items"
        ],
        "answer": 0,
        "tag": "optimistic exploration",
        "explain": "The naive strategy used an optimistic score, mean + lambda * std_dev, which favors items with larger uncertainty (fewer impressions)."
      },
      {
        "q": "How did Trivago's model-based step improve on the naive standard-deviation approach for cold-start items?",
        "options": [
          "It replaced std_dev with a model score (mean + lambda * model_score) from a model trained on high-impression inventory",
          "It removed the lambda parameter entirely",
          "It switched to per-item Thompson sampling",
          "It ranked only by raw impression count"
        ],
        "answer": 0,
        "tag": "model-based exploration / cold start",
        "explain": "They trained a predictive model on high-impression inventory and scored low-impression items with it, ranking by mean + lambda * model_score to distinguish items with identical exposure."
      },
      {
        "q": "What role does the lambda parameter play in Trivago's approach?",
        "options": [
          "It tunes exploration strength, tracing a Pareto frontier of the explore-exploit trade-off",
          "It sets the learning rate of a neural ranker",
          "It is the discount factor for long-term reward",
          "It is the click probability in a cascade model"
        ],
        "answer": 0,
        "tag": "exploration control",
        "explain": "Lambda controls how strongly exploration is weighted, letting Trivago move along a Pareto frontier of the trade-off between exploration and topline metrics."
      }
    ],
    "short": [
      {
        "q": "What metrics did Trivago use to judge exploration quality, and what did their A/B tests show?",
        "model": "Trivago measured exploration along three axes: extent (the clickshare gained by previously unexposed accommodations), quality (how well the newly exposed inventory actually performs), and cost (impact on topline user and revenue metrics). Their A/B tests showed that high-quality exploration could be achieved at no short-term revenue cost and with no significant shift in advertiser clickshares. The lambda parameter successfully controlled the extent of exploration along a Pareto frontier, and the model-based scoring outperformed the naive standard-deviation approach at distinguishing items that had identical exposure levels.",
        "points": [
          "Three metrics: extent (clickshare of unexposed inventory), quality (performance of newly exposed items), cost (topline impact)",
          "Exploration achieved at no short-term revenue cost and no significant advertiser clickshare shift",
          "Lambda traced a Pareto frontier controlling exploration extent",
          "Model-based scoring beat naive std_dev for items with equal exposure"
        ],
        "tag": "evaluation metrics + results"
      }
    ]
  },
  "cs-expedia-cascade-bandits": {
    "mcq": [
      {
        "q": "What key user-behavior assumption does the cascade click model make?",
        "options": [
          "Users scan the list top-to-bottom and stop after clicking the first attractive item",
          "Users click every item they examine independently",
          "Users read the entire list before clicking exactly one item",
          "Users click uniformly at random regardless of position"
        ],
        "answer": 0,
        "tag": "cascade click model",
        "explain": "The cascade model assumes sequential top-to-bottom examination where the user stops after the first click, which naturally captures position bias."
      },
      {
        "q": "In the cascade model's feedback, how are items relative to the clicked position labeled?",
        "options": [
          "Clicked item positive, items before it negative, items after it ignored",
          "All shown items positive, all unshown items negative",
          "Only the clicked item is used; everything else is ignored",
          "Items before the click positive, items after negative"
        ],
        "answer": 0,
        "tag": "feedback labeling",
        "explain": "The clicked item is positive, items before the click are negative (examined but not attractive), and items after the click are ignored (unexamined)."
      },
      {
        "q": "Why does Expedia treat individual items as sub-arms rather than treating each full ranking as an arm?",
        "options": [
          "The number of ranking permutations is enormous (about 11 billion for 15 items to length 10), so per-item structure is exploited instead",
          "Individual items have no features to learn from",
          "Full-ranking arms are required by Thompson sampling",
          "Per-item arms eliminate the need for any exploration"
        ],
        "answer": 0,
        "tag": "structured bandit / action space",
        "explain": "Treating each permutation as an arm explodes to ~11 billion arms for 15 items ranked to 10; the cascade structure lets them learn per-item attractiveness instead."
      },
      {
        "q": "Which algorithm does the article use, and how does it explore?",
        "options": [
          "CascadeLinTS (Cascade Linear Thompson Sampling), exploring by sampling from a posterior rather than a deterministic bonus",
          "CascadeUCB, exploring via a deterministic confidence bonus",
          "Epsilon-greedy over full rankings",
          "A DQN with an entropy exploration term"
        ],
        "answer": 0,
        "tag": "CascadeLinTS / Thompson sampling",
        "explain": "The system uses Cascade Linear Thompson Sampling, which explores by drawing random samples from the posterior over item-attractiveness coefficients rather than using deterministic UCB or epsilon-greedy."
      }
    ],
    "short": [
      {
        "q": "Describe how CascadeLinTS models item attractiveness and selects a ranking, and what the simulation showed.",
        "model": "CascadeLinTS models each item's attraction probability as a linear function of its features and an unknown parameter vector, over which it maintains an approximate posterior. Each round it (1) samples a parameter vector from a normal approximation to the posterior, (2) estimates the optimal ranking under those sampled beliefs, and (3) updates the posterior from the observed cascade feedback (binary click: 1 if the item was clicked, 0 otherwise). Because feedback is 'bandit feedback' - only shown items are observed - the cascade structure lets rewards be decomposed across individual items to still learn about unshown rankings. In a simulation with 10 candidates, 5-position rankings, and contextual features, CascadeLinTS achieved lower cumulative regret than a greedy non-exploring baseline after 100k interactions.",
        "points": [
          "Attraction probability = linear combination of item features and unknown parameters, with a maintained posterior",
          "Three steps: sample parameters, choose ranking, update posterior from feedback",
          "Binary click reward under bandit feedback; cascade structure decomposes reward across items",
          "Simulation (10 candidates, 5 positions): CascadeLinTS beat greedy baseline on cumulative regret after 100k interactions"
        ],
        "tag": "CascadeLinTS mechanics + results"
      }
    ]
  },
  "cs-airbnb-ltr-diversely": {
    "mcq": [
      {
        "q": "What core failure mode of the standard ranker does Airbnb's 'Learning To Rank Diversely' work address?",
        "options": [
          "The 'Majority principle' — ranking each listing independently keeps favoring listings that match aggregate guest preferences at every position",
          "Cold-start, where new listings have no booking history to rank on",
          "Latency, because scoring every listing independently is too slow at query time",
          "Label leakage from using booked listings as training features"
        ],
        "answer": 0,
        "tag": "problem framing",
        "explain": "The article frames the issue as the Majority principle: scoring listings independently repeatedly surfaces listings matching the average guest, ignoring minority preferences."
      },
      {
        "q": "Which principle does Airbnb invoke to argue that catering only to the majority leaves booking value on the table?",
        "options": [
          "The Pareto principle — a minority segment (~20% of bookings) accounts for ~50% of booking value",
          "The Peter principle",
          "The precautionary principle",
          "The principle of least privilege"
        ],
        "answer": 0,
        "tag": "diversity motivation",
        "explain": "They cite the Pareto principle: heterogeneous minority preferences (about 20% of bookings) drive about 50% of booking value, so serving only the majority is suboptimal."
      },
      {
        "q": "How does Airbnb inject diversity into the ranking instead of scoring each listing independently?",
        "options": [
          "A companion similarity network discounts a listing's score by its similarity to listings already placed above it, and results are filled position-by-position",
          "A determinantal point process is trained end-to-end over the full candidate set",
          "A hard post-filter removes any listing sharing a neighborhood with a higher-ranked one",
          "Random shuffling of the top-N results to guarantee variety"
        ],
        "answer": 0,
        "tag": "diversity mechanism",
        "explain": "A second (similarity) network estimates similarity to already-ranked listings; the ranker subtracts this, and positions are filled sequentially discounting similarity to items above."
      },
      {
        "q": "How is the similarity network trained from logged search results?",
        "options": [
          "The top result is set aside as an 'antecedent listing', and booked-vs-not-booked listings from lower positions teach the model that guests who booked lower chose something dissimilar",
          "Human raters label pairs of listings as similar or dissimilar",
          "It is trained purely on listing image embeddings with a contrastive loss",
          "It reuses the booking-probability network's weights with no additional training"
        ],
        "answer": 0,
        "tag": "training construction",
        "explain": "The article describes setting aside the top result as the antecedent and learning from position-2+ booked vs not-booked signals that reflect a preference for dissimilar listings."
      }
    ],
    "short": [
      {
        "q": "Explain how Airbnb's two-network design produces a diverse ranking at serving time, and what the online results were.",
        "model": "Airbnb keeps a primary booking-probability network and adds a companion similarity network that estimates how similar a listing is to those already ranked above it. At serving time it fills the top slot with the highest booking probability, then for each next position picks the listing with the best probability after discounting its similarity to the items already placed. This sequential, diversity-discounted selection breaks the Majority principle. Online it delivered roughly +0.29% uncancelled bookings, +0.8% booking value, and +0.4% five-star ratings.",
        "points": [
          "Two networks: booking-probability plus a similarity network scoring likeness to already-ranked listings",
          "Sequential/greedy fill: each position discounts similarity to items above it (diversity as a reranking step)",
          "Online lift: ~+0.29% uncancelled bookings, +0.8% booking value (value grew more than count), +0.4% five-star ratings"
        ],
        "tag": "system design and results"
      }
    ]
  },
  "cs-dailymotion-diversity": {
    "mcq": [
      {
        "q": "Why does Dailymotion argue for diversity in the video feed rather than ranking purely by predicted performance?",
        "options": [
          "Ranking only by performance creates a filter bubble where users see the same content repeatedly, so exploration is needed to surface novel content",
          "High-performance videos are too expensive to serve, so diversity reduces cost",
          "Diversity is legally required for content platforms",
          "Performance models cannot be trained on video data"
        ],
        "answer": 0,
        "tag": "diversity motivation",
        "explain": "The article states ranking only by performance leads to users always seeing the same content, i.e. a filter bubble, motivating exploration."
      },
      {
        "q": "How does Dailymotion represent and enforce diversity in this first-steps approach?",
        "options": [
          "Categorical diversity from user-declared onboarding interests, using stratified sampling to get roughly equal videos per interest",
          "Determinantal point processes over learned video embeddings",
          "A GAN that generates diverse thumbnails",
          "Collaborative filtering on co-view graphs"
        ],
        "answer": 0,
        "tag": "diversity representation",
        "explain": "Rather than embeddings, they use categorical diversity based on onboarding interests and apply stratified sampling for roughly equal videos per interest."
      },
      {
        "q": "How does Dailymotion balance exploration against historical performance in this design?",
        "options": [
          "Multiple specialized rankers (e.g. Freshness & Performance, Exploration, Interest-based) each assigned a probability of being used",
          "A single fixed lambda weight added to every score",
          "A hard cap limiting each ranker to 10% of slots",
          "Thompson sampling over per-video reward posteriors"
        ],
        "answer": 0,
        "tag": "relevance vs diversity tradeoff",
        "explain": "They combine several specialized rankers probabilistically, each assigned a probability that balances exploration versus historical performance."
      },
      {
        "q": "What is the optimization objective / evaluation metric Dailymotion targets for the home feed?",
        "options": [
          "Median watch time per user, chosen for robustness to outliers and clickbait",
          "Click-through rate on the first video",
          "Mean session count per day",
          "Total number of distinct categories shown"
        ],
        "answer": 0,
        "tag": "evaluation objective",
        "explain": "They optimize watch time per user and specifically use the median (not mean) because it is robust to outliers and clickbait."
      }
    ],
    "short": [
      {
        "q": "Describe Dailymotion's first-steps diversity architecture: candidate generation, the reranking idea, and how relevance vs diversity is traded off.",
        "model": "Dailymotion uses a two-stage YouTube-style pipeline: analysts quality-filter candidates, then multiple specialized rankers (Freshness & Performance, Exploration, Interest-based) produce results. Diversity is categorical, driven by interests users declare at onboarding, with stratified sampling to pull roughly equal numbers of videos per interest, plus a reranking pass that computes pairwise similarity from video attributes and prefers less-similar videos. The relevance-vs-diversity tradeoff is handled probabilistically: each ranker gets a probability of being used, balancing exploration against historical performance, and the system optimizes median watch time per user for robustness to clickbait.",
        "points": [
          "Two-stage pipeline: analyst quality-filtered candidates then multiple specialized rankers",
          "Categorical diversity from onboarding interests + stratified sampling and attribute-similarity reranking (MMR-like, not named)",
          "Probabilistic ranker mixing trades exploration vs performance; objective is median watch time per user"
        ],
        "tag": "system design"
      }
    ]
  },
  "cs-deliveryhero-coldstart-ranking": {
    "mcq": [
      {
        "q": "Which learning-to-rank model does Delivery Hero adopt for ranking restaurants?",
        "options": [
          "LambdaMART — combining LambdaRank with gradient-boosted trees",
          "A two-tower neural retrieval model",
          "A determinantal point process reranker",
          "Matrix factorization on the user-restaurant matrix"
        ],
        "answer": 0,
        "tag": "model choice",
        "explain": "Delivery Hero adopts LambdaMART, which combines LambdaRank and gradient-boosted trees and works well with many features and little transformation."
      },
      {
        "q": "For a brand-new user with no order history, how does Delivery Hero approximate the ranking signals?",
        "options": [
          "Approximate relevance by popularity, and approximate delivery time and fees by distance",
          "Fall back to a purely random ordering until data accrues",
          "Copy the ranking of the most recently active existing user",
          "Rank alphabetically by restaurant name"
        ],
        "answer": 0,
        "tag": "cold-start signals",
        "explain": "For new customers with no history, relevance is approximated by popularity and delivery time/fees are approximated by distance."
      },
      {
        "q": "How do Delivery Hero's cold-start models compensate for not knowing much about a new customer?",
        "options": [
          "They lean on aggregate signals and behaviours learned from long-term customers, and some use app-usage behaviour",
          "They require the user to complete a mandatory preference quiz before serving results",
          "They disable personalization entirely and only sort by distance forever",
          "They ask a large language model to invent a preference profile"
        ],
        "answer": 0,
        "tag": "cold-start strategy",
        "explain": "Cold-start models use aggregate information and signals from long-term customers, and some incorporate platform/app usage behaviour, to tailor results for new users."
      },
      {
        "q": "How did Delivery Hero select final model parameters and validate the ranker?",
        "options": [
          "Multiple rounds of backtesting, picking parameters from the backtest with the highest average NDCG, and it beat simple distance sorting",
          "A single train/test split scored only on click-through rate",
          "Manual tuning by product managers with no offline metric",
          "Reinforcement learning reward tuned purely online"
        ],
        "answer": 0,
        "tag": "evaluation",
        "explain": "They ran multiple backtests and chose the parameters with the highest average NDCG; the model outperformed simple distance sorting."
      }
    ],
    "short": [
      {
        "q": "Summarize how Delivery Hero ranks restaurants for new users despite the cold-start problem, including model, signals, and evaluation.",
        "model": "Delivery Hero uses LambdaMART (LambdaRank combined with gradient-boosted trees), which handles many features with minimal transformation. For a new user with no history it approximates relevance by restaurant popularity and approximates delivery time and fees by distance, while leaning on aggregate behavioural signals learned from long-term customers (and, in some models, app-usage behaviour). Features capture things like cuisines and taste, and operationally strong restaurants rank higher. They tuned the model via multiple backtests, selecting the parameters with the highest average NDCG, and the model outperformed simple distance-based sorting.",
        "points": [
          "Model: LambdaMART (LambdaRank + gradient-boosted trees), good with many raw features",
          "Cold-start proxies: popularity for relevance, distance for delivery time/fees, plus aggregate long-term-customer signals",
          "Evaluated by backtesting on NDCG; beat naive distance sorting"
        ],
        "tag": "cold-start ranking design"
      }
    ]
  },
  "cs-gousto-coldstart-recipes": {
    "mcq": [
      {
        "q": "What are the two cold-start problems Gousto identifies, and which do they prioritize?",
        "options": [
          "User cold-start (new customers with no history) and product cold-start (weekly new recipes with no interactions); they prioritize user cold-start",
          "Server cold-start and cache cold-start; they prioritize cache",
          "Cold-start in delivery routing and in pricing; they prioritize pricing",
          "Only a single product cold-start problem exists"
        ],
        "answer": 0,
        "tag": "problem framing",
        "explain": "Gousto separates user cold-start and product cold-start (menus change weekly), and prioritizes the user side because early-tenure customers carry retention value."
      },
      {
        "q": "Why did the item-based collaborative-filtering 'Rouxcommender Jnr' struggle, producing a 'bump in the middle of the chart'?",
        "options": [
          "It suffers product cold-start — new recipes have no past orders, so they underperform despite being relevant",
          "It overfit to a single popular cuisine",
          "It was too slow to serve in real time",
          "It required explicit ratings that users never gave"
        ],
        "answer": 0,
        "tag": "collaborative filtering limits",
        "explain": "Co-purchase collaborative filtering can't score brand-new weekly recipes that lack order history, causing them to underperform relevance."
      },
      {
        "q": "What key representation change did Rouxcommender-V2 make to handle unknown customers?",
        "options": [
          "Represent a customer by their ordering behaviours instead of a customer-ID embedding",
          "Assign every new customer the global average embedding",
          "Require login with a third-party taste profile",
          "Drop customer features and rank recipes by popularity only"
        ],
        "answer": 0,
        "tag": "user representation",
        "explain": "V2 moved from customer-ID embeddings to a behaviour-based representation focused on ordering patterns, so unknown customers can be handled with minimal data."
      },
      {
        "q": "How does Rouxcommender-V2's bi-encoder architecture solve the product (new-recipe) cold-start?",
        "options": [
          "The right encoder uses a hybrid content-based + behaviour-based recipe embedding (pre-trained and frozen), so new recipes still get content signals",
          "It ignores new recipes until they gather 100 orders",
          "It generates synthetic orders for new recipes",
          "It falls back to the left encoder only"
        ],
        "answer": 0,
        "tag": "content-based cold-start",
        "explain": "Recipe embeddings are hybrid (content + behaviour) and pre-trained/frozen for transfer learning, so a brand-new recipe still receives content-based signal regardless of interaction history."
      }
    ],
    "short": [
      {
        "q": "Explain Rouxcommender-V2's bi-encoder design and how it addresses both user and product cold-start, plus a serving constraint they hit.",
        "model": "Rouxcommender-V2 is a bi-encoder: a left encoder is a Bi-RNN that reads a customer's previous behaviour as a sequence of recipe embeddings, and a right encoder builds recipe representations that are hybrid content-based plus behaviour-based, with all recipe embeddings pre-trained and frozen for transfer learning. Representing customers by behaviour rather than a customer ID solves user cold-start, because unknown customers can still be scored from minimal ordering data. The hybrid, content-inclusive recipe embeddings solve product cold-start, since brand-new weekly recipes still get content signals without any order history. They also moved to real-time inference under a latency budget (target under 400ms, achieved about 120ms) with fallbacks.",
        "points": [
          "Bi-encoder: Bi-RNN over the customer's recipe-sequence history (left) + hybrid content/behaviour recipe embeddings (right), pre-trained and frozen",
          "Behaviour-based customer representation solves user cold-start; content-inclusive recipe embeddings solve new-recipe cold-start",
          "Real-time serving under a latency budget (~120ms vs 400ms target), improving basket match and diversity across tenures"
        ],
        "tag": "cold-start architecture"
      }
    ]
  },
  "cs-pinterest-search-llm": {
    "mcq": [
      {
        "q": "How does Pinterest formulate the search relevance prediction task for its LLM-based model?",
        "options": [
          "Multiclass classification over a 5-level relevance grading scale",
          "Binary relevant/not-relevant classification",
          "Pointwise regression to a continuous CTR value",
          "Pairwise ranking with no explicit relevance grades"
        ],
        "answer": 0,
        "tag": "task formulation",
        "explain": "The relevance task is a multiclass classification over a 5-level grading scale, emphasizing correctly identifying highly relevant content."
      },
      {
        "q": "Which model performed best as the LLM relevance teacher, and by how much over the multilingual BERT-base baseline?",
        "options": [
          "Llama-3-8B, outperforming multilingual BERT-base by 12.5% on 5-scale accuracy",
          "T5-base, by 5% on 5-scale accuracy",
          "mDeBERTa-V3-base, by 20% on nDCG",
          "XLM-RoBERTa-large, by 2.18% on nDCG@20"
        ],
        "answer": 0,
        "tag": "teacher model",
        "explain": "Among the cross-encoder candidates, Llama-3-8B won, beating multilingual BERT-base by 12.5% (and the baseline by 19.7%) in 5-scale accuracy."
      },
      {
        "q": "Why did Pinterest distill the cross-encoder LLM into a lightweight student model instead of serving the LLM directly?",
        "options": [
          "The cross-encoder LLM is hard to scale under real-time search latency and cost constraints",
          "The LLM could not handle non-English queries",
          "The LLM produced only binary labels",
          "Regulatory rules forbade LLMs in ranking"
        ],
        "answer": 0,
        "tag": "knowledge distillation",
        "explain": "The core tradeoff is serving efficiency vs accuracy: the cross-encoder LLM is hard to scale for real-time search due to latency and cost, so it is distilled into a lightweight student."
      },
      {
        "q": "How does Pinterest transfer the LLM teacher's knowledge to the production student model at scale?",
        "options": [
          "The teacher generates 5-scale relevance pseudo-labels on billions of daily logged search/impression rows to train the student",
          "The student directly loads the teacher's weights",
          "Human raters relabel the entire query log daily",
          "The student is trained only on the original US human-labeled set"
        ],
        "answer": 0,
        "tag": "semi-supervised distillation",
        "explain": "The teacher LLM labels a daily logged dataset with billions of rows, generating 5-scale pseudo-labels that train the student and enable multilingual generalization."
      }
    ],
    "short": [
      {
        "q": "Describe Pinterest's LLM-based search relevance system: the teacher, the distillation to a student, and the reported results, including multilingual generalization.",
        "model": "Pinterest uses a cross-encoder LLM (Llama-3-8B won over mDeBERTa, XLM-RoBERTa, T5, and BERT variants) as a teacher that predicts relevance as a 5-level multiclass label, fed enriched Pin text such as titles, descriptions, BLIP image captions, high-engagement query tokens, and board titles. Because the cross-encoder is too costly and slow for real-time serving, the teacher is distilled into a lightweight student that uses query features (SearchSAGE), Pin features (PinSAGE, visual embeddings), and query-Pin interaction features (BM25, historical engagement). The teacher generates 5-scale pseudo-labels on billions of daily logged rows, which trains the student and lets it generalize from US human labels to unseen languages and countries. Online, human evaluation showed +2.18% search feed relevance by nDCG@20, with fulfillment gains in non-US markets.",
        "points": [
          "Teacher: cross-encoder LLM (Llama-3-8B best) doing 5-scale relevance on enriched Pin text features",
          "Distilled to a lightweight student (SearchSAGE/PinSAGE/visual + BM25/engagement) for latency and cost; trained on billions of teacher-labeled logged rows",
          "Results: +2.18% nDCG@20 in human relevance eval, plus multilingual generalization to unseen languages/countries"
        ],
        "tag": "LLM distillation for relevance"
      }
    ]
  }
};
