from PIL import Image
import subprocess
import os

check_path  = "checkershadow_illusion4med.jpg"
img         = Image.open(check_path)
all_pix     = img.load()

a_pos       = [229, 326, 118, 170]
b_pos       = [222, 323, 208, 261]
origin_v    = 120
threshold   = 40

def get_new_pix(pix, pos, origin_v, target_v):
    for x_ind in range(pos[0], pos[1]):
        for y_ind in range(pos[2], pos[3]):
            if abs(pix[x_ind, y_ind][0] - origin_v)<threshold:
                pix[x_ind, y_ind]   = (target_v, target_v, target_v)

    #return pix

'''
#get_new_pix(all_pix, a_pos, origin_v, 255)
get_new_pix(all_pix, b_pos, origin_v, 255)
img.show()
img.save("results_a_test.png")
'''

#cmd_run     = ["webppl", "ad_batch.wppl", "3", "1", "1", "0.5", "--require", "ndarray", "--require", "save-pixels"]
cmd_run     = ["webppl", "ad_batch.wppl 3 1 1 0.5 --require ndarray --require save-pixels"]

#out = subprocess.check_output(cmd_run)
os.system(cmd_run[0] + " " + cmd_run[1])
#print(out)
