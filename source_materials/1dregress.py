import numpy as np
import matplotlib.pyplot as plt

y = np.array([[1.1],[2.3],[2.9],[1.7]])
X = np.array([[0.8],[1.9],[3.1],[1.2]])
plt.plot(X,y,'.')

x_base = np.linspace(0,5,1000)

dubya = np.linalg.lstsq(X,y)[0]

line = dubya[0]*x_base

plt.plot(x_base, line, 'b')
plt.show()