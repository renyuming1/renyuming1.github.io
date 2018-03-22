---
layout: post
title:  Python Numpy Learning note
date:   2018-03-21 11:12:26
categories: ML
tags: ML
author: yuming
---

* content
{:toc}

# lib Load 
> import numpy as np



# Data Structure:

 1. Series
2. DataFramework:
A 2-D labeled data structure with columns of potentially different types.

## DataFramework

### DF Information:
> df.index   

> df.columns


# ndarray
1. n multi dimension array
2. A generic multidimensional container for homogeneous data, so it should be same type.
3. It will convert type into homogeneous type

## Create
1.
> data1 = [1,2,3,4]
> arr = np.array(data1)
> arr = np.array(data1, dtype=np.float64)

> out: array([1,2,3,4])

2. Use `zeros` or `ones`
> np.zeros(10)
> np.ones(11)

3. Use `arange`
> np.arange(15)

4. Use `eye`/ `identity` to create a Square N x N identity matrix

## Operations

### Vectorization

> arr * arr
> arr - arr


# Useful functions

* dtype
> data.dtype

* ndim
> arr2.ndim

* shape

* asarray


# copy or in-place
1. If you want a copy of a slice of an ndarray instead of view, you will need to explicitly copy the array. Use `arr[5:8].copy()`


