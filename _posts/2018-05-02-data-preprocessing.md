---
layout: post
title:  "Data Pre-Processing Missing Data"
date:   2018-05-02 17:06:05
categories: Machine Learning
tags: Machine Learning
---

* content
{:toc}


### Sample DF

|   | A | B  | C   | D   |
|---|---|----|-----|-----|
| 0 | 1 | 2  | 3   | 4   |
| 1 | 5 | 6  | NaN | 8   |
| 2 | 0 | 11 | 12  | NaN |

## Analysis Missing Data in Pandas
```python
df.isnull().sum()
```

Use `df.value` to access the underlying NumPy array.


## Handle Missing Data
> df.dropna()

### Drop 
Drop NaN values(rows/cols)
#### Drop rows

```python
# only drop rows where all columns are NaN
df.dropna(how='all')
# drop rows that have not at least 4 non-NaN values
df.dropna(thresh=4)
# only drop rows where NaN appear in specific columns (here: 'C')
df.dropna(subset=['C'])
```


#### Drop columns
```python
df.dropna(axis=1)
```

#### Compare
drop rows vs drop columns:

drop rows may include *overfitting* as it will lose valueable data. while drop columns amy include *underfitting* as it will reduce features.

### Impute 
Just drop NaN values may lose too many values, so we can estimate the missing values from the other training samples.
#### mean imputation
we simply replace the missing value by the mean value of the entire feature column. We can use `from sklearn.preprocessing import Imputer` to do that.
```python 
from sklearn.preprocessing import Imputer
imr = Imputer(missing_values='NaN', strategy='mean', axis=0)
imr = imr.fit(df)
imputed_data = imr.transform(df.values)
imputed_data
```
Options:
1. Change row or column
    `axis to 0/1`
2. Change impute algorithm - strategy
    * `mean`
    * `most_frequent`: which is mostly used for categorical feature values
    * `median`

#### MICE
 mice：multivariate imputation via chained equation.
 假设missing at random (MAR)，也就是说数据缺失的概率仅与其他观察值有关，所以可以通过预测进行估计。这是一种参数型方法，对于不同的缺失值变量采用不同的回归或者其他方法进行imputation

### transformer

Used to transfer data. There are 2 main essential methods. `fit` & `transfer`
* **fit**: learn the parameters from the training data
* **transfer**: use those parameters to transform the data. 
