---
layout: post
title:  Python Pandas Learning note
date:   2018-03-20 11:12:26
categories: ML
tags: ML
author: yuming
---

* content
{:toc}

# Data Load 


# Data Structure:

 1. Series
2. DataFramework:
A 2-D labeled data structure with columns of potentially different types.

## DataFramework

### DF Information:
> df.index   

> df.columns


### DF read

| Operation   |      Syntax      |  Result |
|----------|:-------------:|------:|
| Select column | df['col']  | Series |
| Select Row by lable |    df.loc[label]   | Series  |
| Select Row by index location | df.iloc[loc] |  Series |
| Select Slice rows | df[5:11] |  DataFramework |
| Select Rows by boolean vector | df[bool_vec] |  DataFramework |

#### Column selection
> df['col_name']


#### loc vs iloc
*loc* is label-based, which means that you have to specify rows and columns based on their row and column labels. iloc is integer index based, so you have to specify rows and columns by their integer index like you did in the previous exercise.



### DF operate

### Column Add
1. Assignment using "="
> df['new'] = df['col_one'] * df['col_two']      
> df['new'] = df['col_one'] > 2

2. Insert:
You can insert raw ndarrays but their length must match the length of the DataFrame’s index. particular location

> df.insert(1, 'bar', df['col_one'])

3. Assign Method 
> df.assign(new_col = df['col_one'] / df['col_two'])
4. Lambda Function:
> df.assign(new_col = lambda x: (x['col_one'] / x['col_two']))

