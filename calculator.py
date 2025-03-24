def add_numbers(a: float, b: float) -> float:
    """
    计算两个数字的和
    
    参数:
        a (float): 第一个数字
        b (float): 第二个数字
        
    返回:
        float: 两个数字的和
    """
    return a + b

# 测试代码
if __name__ == "__main__":
    # 测试用例
    num1 = 5
    num2 = 3
    result = add_numbers(num1, num2)
    print(f"{num1} + {num2} = {result}") 